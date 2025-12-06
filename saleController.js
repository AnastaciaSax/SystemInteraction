const { Sale, Route, Country } = require('../models');

// Получить все продажи с пагинацией, сортировкой, фильтрацией
exports.getAllSales = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'sale_date',
      sortOrder = 'desc',
      startDate,
      endDate,
      minQuantity,
      maxQuantity,
      minTotalCost,
      maxTotalCost,
      route,
      country,
      search
    } = req.query;

    const skip = (page - 1) * limit;
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Создаем фильтры
    const filters = {};

    // Фильтрация по дате
    if (startDate || endDate) {
      filters.sale_date = {};
      if (startDate) {
        filters.sale_date.$gte = new Date(startDate);
      }
      if (endDate) {
        filters.sale_date.$lte = new Date(endDate);
      }
    }

    // Фильтрация по количеству
    if (minQuantity || maxQuantity) {
      filters.quantity = {};
      if (minQuantity) filters.quantity.$gte = parseInt(minQuantity);
      if (maxQuantity) filters.quantity.$lte = parseInt(maxQuantity);
    }

    // Фильтрация по общей стоимости
    if (minTotalCost || maxTotalCost) {
      filters.total_cost_usd = {};
      if (minTotalCost) filters.total_cost_usd.$gte = parseFloat(minTotalCost);
      if (maxTotalCost) filters.total_cost_usd.$lte = parseFloat(maxTotalCost);
    }

    // Фильтрация по маршруту
    if (route) {
      filters.route = route;
    }

    // Фильтрация по стране (через маршрут)
    if (country) {
      // Найдем все маршруты для этой страны
      const routes = await Route.find({ country }).select('_id');
      const routeIds = routes.map(r => r._id);
      filters.route = { $in: routeIds };
    }

    // Поиск по нескольким полям через lookup
    if (search) {
      // Этот фильтр будет применен после агрегации
    }

    // Используем агрегацию для сложных запросов
    const pipeline = [
      { $match: filters },
      {
        $lookup: {
          from: 'routes',
          localField: 'route',
          foreignField: '_id',
          as: 'routeInfo'
        }
      },
      { $unwind: '$routeInfo' },
      {
        $lookup: {
          from: 'countries',
          localField: 'routeInfo.country',
          foreignField: '_id',
          as: 'countryInfo'
        }
      },
      { $unwind: '$countryInfo' },
      {
        $project: {
          sale_date: 1,
          visa_cost_usd: 1,
          quantity: 1,
          total_cost_usd: 1,
          route: {
            _id: '$routeInfo._id',
            name: '$routeInfo.name',
            price_usd: '$routeInfo.price_usd',
            country: {
              _id: '$countryInfo._id',
              name: '$countryInfo.name',
              currency: '$countryInfo.currency'
            }
          }
        }
      }
    ];

    // Добавляем поиск если есть
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'route.name': { $regex: search, $options: 'i' } },
            { 'route.country.name': { $regex: search, $options: 'i' } }
          ]
        }
      });
    }

    // Добавляем сортировку и пагинацию
    pipeline.push({ $sort: sort });
    
    const facetPipeline = [
      { $skip: skip },
      { $limit: parseInt(limit) }
    ];

    const countPipeline = [
      { $count: 'total' }
    ];

    const results = await Sale.aggregate([
      ...pipeline,
      {
        $facet: {
          data: facetPipeline,
          pagination: countPipeline
        }
      }
    ]);

    const sales = results[0].data;
    const total = results[0].pagination[0] ? results[0].pagination[0].total : 0;

    res.json({
      success: true,
      data: sales,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales',
      error: error.message
    });
  }
};

// Получить продажу по ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate({
        path: 'route',
        select: 'name price_usd duration_days',
        populate: {
          path: 'country',
          select: 'name currency'
        }
      });

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: 'Sale not found'
      });
    }

    res.json({
      success: true,
      data: sale
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sale',
      error: error.message
    });
  }
};

// Создать новую продажу
exports.createSale = async (req, res) => {
  try {
    const { route, sale_date, visa_cost_usd, quantity } = req.body;

    // Проверяем существование маршрута
    const routeExists = await Route.findById(route);
    if (!routeExists) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    // Рассчитываем общую стоимость
    const total_cost_usd = (routeExists.price_usd * quantity) + (visa_cost_usd * quantity);

    const sale = await Sale.create({
      route,
      sale_date,
      visa_cost_usd,
      quantity,
      total_cost_usd
    });

    const populatedSale = await Sale.findById(sale._id)
      .populate({
        path: 'route',
        select: 'name price_usd',
        populate: {
          path: 'country',
          select: 'name currency'
        }
      });

    res.status(201).json({
      success: true,
      message: 'Sale created successfully',
      data: populatedSale
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating sale',
      error: error.message
    });
  }
};

// Обновить продажу
exports.updateSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({
        success: false,
        message: 'Sale not found'
      });
    }

    const { route, sale_date, visa_cost_usd, quantity } = req.body;

    // Если меняется маршрут или количество, пересчитываем стоимость
    if (route || quantity || visa_cost_usd) {
      const routeData = await Route.findById(route || sale.route);
      if (!routeData) {
        return res.status(404).json({
          success: false,
          message: 'Route not found'
        });
      }

      const newQuantity = quantity || sale.quantity;
      const newVisaCost = visa_cost_usd || sale.visa_cost_usd;
      const total_cost_usd = (routeData.price_usd * newQuantity) + (newVisaCost * newQuantity);

      req.body.total_cost_usd = total_cost_usd;
    }

    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate({
      path: 'route',
      select: 'name price_usd',
      populate: {
        path: 'country',
        select: 'name currency'
      }
    });

    res.json({
      success: true,
      message: 'Sale updated successfully',
      data: updatedSale
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating sale',
      error: error.message
    });
  }
};

// Удалить продажу
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({
        success: false,
        message: 'Sale not found'
      });
    }

    await Sale.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Sale deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting sale',
      error: error.message
    });
  }
};

// Получить статистику по продажам
exports.getSalesStats = async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'country' } = req.query;

    const matchStage = {};
    
    // Фильтрация по дате
    if (startDate || endDate) {
      matchStage.sale_date = {};
      if (startDate) matchStage.sale_date.$gte = new Date(startDate);
      if (endDate) matchStage.sale_date.$lte = new Date(endDate);
    }

    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'routes',
          localField: 'route',
          foreignField: '_id',
          as: 'routeInfo'
        }
      },
      { $unwind: '$routeInfo' },
      {
        $lookup: {
          from: 'countries',
          localField: 'routeInfo.country',
          foreignField: '_id',
          as: 'countryInfo'
        }
      },
      { $unwind: '$countryInfo' }
    ];

    // Группировка по стране
    if (groupBy === 'country') {
      pipeline.push({
        $group: {
          _id: '$countryInfo._id',
          country_name: { $first: '$countryInfo.name' },
          currency: { $first: '$countryInfo.currency' },
          total_quantity: { $sum: '$quantity' },
          total_revenue: { $sum: '$total_cost_usd' },
          total_sales: { $sum: 1 },
          average_sale: { $avg: '$total_cost_usd' },
          routes: { $addToSet: '$routeInfo.name' }
        }
      });
    }
    // Группировка по маршруту
    else if (groupBy === 'route') {
      pipeline.push({
        $group: {
          _id: '$routeInfo._id',
          route_name: { $first: '$routeInfo.name' },
          country_name: { $first: '$countryInfo.name' },
          total_quantity: { $sum: '$quantity' },
          total_revenue: { $sum: '$total_cost_usd' },
          total_sales: { $sum: 1 },
          average_sale: { $avg: '$total_cost_usd' }
        }
      });
    }
    // Группировка по месяцу
    else if (groupBy === 'month') {
      pipeline.push({
        $group: {
          _id: {
            year: { $year: '$sale_date' },
            month: { $month: '$sale_date' }
          },
          total_quantity: { $sum: '$quantity' },
          total_revenue: { $sum: '$total_cost_usd' },
          total_sales: { $sum: 1 },
          average_sale: { $avg: '$total_cost_usd' }
        }
      });
      pipeline.push({
        $sort: { '_id.year': 1, '_id.month': 1 }
      });
    }

    // Форматирование результата
    pipeline.push({
      $project: {
        _id: 0,
        id: '$_id',
        country_name: 1,
        route_name: 1,
        currency: 1,
        total_quantity: 1,
        total_revenue: { $round: ['$total_revenue', 2] },
        total_sales: 1,
        average_sale: { $round: ['$average_sale', 2] },
        routes: 1,
        month: { $ifNull: ['$_id.month', null] },
        year: { $ifNull: ['$_id.year', null] }
      }
    });

    const stats = await Sale.aggregate(pipeline);

    // Общая статистика
    const totalStats = await Sale.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total_cost_usd' },
          totalSales: { $sum: 1 },
          totalTravelers: { $sum: '$quantity' },
          averageSaleValue: { $avg: '$total_cost_usd' }
        }
      }
    ]);

    res.json({
      success: true,
      data: stats,
      summary: totalStats[0] || {
        totalRevenue: 0,
        totalSales: 0,
        totalTravelers: 0,
        averageSaleValue: 0
      }
    });
  } catch (error) {
    console.error('Error in getSalesStats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales statistics',
      error: error.message
    });
  }
};

// Проверить существование продажи
exports.checkSaleExists = async (req, res) => {
  try {
    const { route, sale_date, quantity } = req.query;
    
    if (!route || !sale_date || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Route, sale date and quantity are required'
      });
    }

    const sale = await Sale.findOne({
      route,
      sale_date: new Date(sale_date),
      quantity: parseInt(quantity)
    });

    res.json({
      success: true,
      exists: !!sale,
      data: sale || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking sale',
      error: error.message
    });
  }
};