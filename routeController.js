const { Route, Country, Sale } = require('../models');
const { Op } = require('sequelize');

// Получить все маршруты с пагинацией, сортировкой, фильтрацией
exports.getAllRoutes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortOrder = 'ASC',
      countryId,
      minPrice,
      maxPrice,
      search,
      isActive
    } = req.query;

    const offset = (page - 1) * limit;
    
    const whereClause = {};
    const includeClause = [{
      model: Country,
      attributes: ['id', 'name', 'currency']
    }];

    // Фильтрация
    if (countryId) whereClause.countryId = countryId;
    if (isActive !== undefined) whereClause.is_active = isActive === 'true';
    if (minPrice || maxPrice) {
      whereClause.price_usd = {};
      if (minPrice) whereClause.price_usd[Op.gte] = parseFloat(minPrice);
      if (maxPrice) whereClause.price_usd[Op.lte] = parseFloat(maxPrice);
    }

    // Поиск
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const routes = await Route.findAndCountAll({
      where: whereClause,
      include: includeClause,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: routes.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(routes.count / limit),
        totalItems: routes.count,
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
    const route = await Route.findByPk(req.params.id, {
      include: [{
        model: Country,
        attributes: ['id', 'name', 'currency']
      }, {
        model: Sale,
        attributes: ['id', 'sale_date', 'quantity', 'total_cost_usd']
      }]
    });

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    res.json({
      success: true,
      data: route
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
    const route = await Route.create(req.body);
    
    const newRoute = await Route.findByPk(route.id, {
      include: [{
        model: Country,
        attributes: ['id', 'name', 'currency']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Route created successfully',
      data: newRoute
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
    const route = await Route.findByPk(req.params.id);
    
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    await route.update(req.body);
    
    const updatedRoute = await Route.findByPk(route.id, {
      include: [{
        model: Country,
        attributes: ['id', 'name', 'currency']
      }]
    });

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
    const route = await Route.findByPk(req.params.id);
    
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    // Проверка на существование связанных продаж
    const salesCount = await Sale.count({ where: { routeId: req.params.id } });
    if (salesCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete route with existing sales'
      });
    }

    await route.destroy();
    
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