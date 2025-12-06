const { Route, Country, Sale } = require('../models');

// Получить все маршруты с пагинацией, сортировкой, фильтрацией
exports.getAllRoutes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortOrder = 'asc',
      country,
      minPrice,
      maxPrice,
      search,
      isActive,
      minDuration,
      maxDuration
    } = req.query;

    const skip = (page - 1) * limit;
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Создаем фильтры
    const filters = {};

    // Фильтрация по стране
    if (country) {
      filters.country = country;
    }

    // Фильтрация по активности
    if (isActive !== undefined) {
      filters.is_active = isActive === 'true';
    }

    // Фильтрация по цене
    if (minPrice || maxPrice) {
      filters.price_usd = {};
      if (minPrice) filters.price_usd.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price_usd.$lte = parseFloat(maxPrice);
    }

    // Фильтрация по длительности
    if (minDuration || maxDuration) {
      filters.duration_days = {};
      if (minDuration) filters.duration_days.$gte = parseInt(minDuration);
      if (maxDuration) filters.duration_days.$lte = parseInt(maxDuration);
    }

    // Поиск по нескольким полям
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Получаем маршруты с populate страны
    const routes = await Route.find(filters)
      .populate('country', 'name currency')
      .populate({
        path: 'salesCount',
        select: '_id'
      })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Route.countDocuments(filters);

    res.json({
      success: true,
      data: routes,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching routes',
      error: error.message
    });
  }
};

// Получить маршрут по ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id)
      .populate('country', 'name currency')
      .populate({
        path: 'sales',
        select: 'sale_date quantity total_cost_usd',
        options: { limit: 10, sort: { sale_date: -1 } }
      });

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    // Получаем статистику продаж для этого маршрута
    const salesStats = await Sale.aggregate([
      {
        $match: { route: route._id }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: '$total_cost_usd' },
          totalTravelers: { $sum: '$quantity' },
          averageSale: { $avg: '$total_cost_usd' }
        }
      }
    ]);

    const routeData = route.toObject();
    if (salesStats.length > 0) {
      routeData.salesStats = salesStats[0];
    }

    res.json({
      success: true,
      data: routeData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching route',
      error: error.message
    });
  }
};

// Создать новый маршрут
exports.createRoute = async (req, res) => {
  try {
    const routeData = req.body;

    // Проверка существования страны
    const countryExists = await Country.findById(routeData.country);
    if (!countryExists) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    const route = await Route.create(routeData);
    const populatedRoute = await Route.findById(route._id)
      .populate('country', 'name currency');

    res.status(201).json({
      success: true,
      message: 'Route created successfully',
      data: populatedRoute
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating route',
      error: error.message
    });
  }
};

// Обновить маршрут
exports.updateRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    // Если меняется страна, проверяем ее существование
    if (req.body.country && req.body.country !== route.country.toString()) {
      const countryExists = await Country.findById(req.body.country);
      if (!countryExists) {
        return res.status(404).json({
          success: false,
          message: 'Country not found'
        });
      }
    }

    const updatedRoute = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('country', 'name currency');

    res.json({
      success: true,
      message: 'Route updated successfully',
      data: updatedRoute
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating route',
      error: error.message
    });
  }
};

// Удалить маршрут
exports.deleteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    // Проверка на существование связанных продаж
    const salesCount = await Sale.countDocuments({ route: route._id });
    if (salesCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete route with existing sales'
      });
    }

    await Route.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Route deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting route',
      error: error.message
    });
  }
};

// Проверить существование маршрута
exports.checkRouteExists = async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Route name is required'
      });
    }

    const route = await Route.findOne({ 
      name: { $regex: `^${name}$`, $options: 'i' } 
    });

    res.json({
      success: true,
      exists: !!route,
      data: route || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking route',
      error: error.message
    });
  }
};