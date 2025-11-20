const { Sale, Route, Country } = require('../models');
const { Op } = require('sequelize');

// Получить все продажи с пагинацией, сортировкой, фильтрацией
exports.getAllSales = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'sale_date',
      sortOrder = 'DESC',
      startDate,
      endDate,
      minQuantity,
      maxQuantity,
      minTotalCost,
      maxTotalCost,
      routeId,
      countryId
    } = req.query;

    const offset = (page - 1) * limit;
    
    const whereClause = {};
    const includeClause = [{
      model: Route,
      attributes: ['id', 'name', 'price_usd'],
      include: [{
        model: Country,
        attributes: ['id', 'name', 'currency']
      }]
    }];

    // Фильтрация по дате
    if (startDate || endDate) {
      whereClause.sale_date = {};
      if (startDate) whereClause.sale_date[Op.gte] = startDate;
      if (endDate) whereClause.sale_date[Op.lte] = endDate;
    }

    // Фильтрация по количеству
    if (minQuantity || maxQuantity) {
      whereClause.quantity = {};
      if (minQuantity) whereClause.quantity[Op.gte] = parseInt(minQuantity);
      if (maxQuantity) whereClause.quantity[Op.lte] = parseInt(maxQuantity);
    }

    // Фильтрация по общей стоимости
    if (minTotalCost || maxTotalCost) {
      whereClause.total_cost_usd = {};
      if (minTotalCost) whereClause.total_cost_usd[Op.gte] = parseFloat(minTotalCost);
      if (maxTotalCost) whereClause.total_cost_usd[Op.lte] = parseFloat(maxTotalCost);
    }

    // Фильтрация по маршруту
    if (routeId) whereClause.routeId = routeId;

    // Фильтрация по стране (через маршрут)
    if (countryId) {
      includeClause[0].include[0].where = { id: countryId };
    }

    const sales = await Sale.findAndCountAll({
      where: whereClause,
      include: includeClause,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: sales.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(sales.count / limit),
        totalItems: sales.count,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
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
    const sale = await Sale.findByPk(req.params.id, {
      include: [{
        model: Route,
        attributes: ['id', 'name', 'price_usd', 'duration_days'],
        include: [{
          model: Country,
          attributes: ['id', 'name', 'currency']
        }]
      }]
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
    const { routeId, sale_date, visa_cost_usd, quantity } = req.body;

    // Найдем маршрут, чтобы узнать цену
    const route = await Route.findByPk(routeId);
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    // Рассчитаем общую стоимость: (цена путевки * количество) + (стоимость визы * количество)
    const total_cost_usd = (route.price_usd * quantity) + (visa_cost_usd * quantity);

    const sale = await Sale.create({
      routeId,
      sale_date,
      visa_cost_usd,
      quantity,
      total_cost_usd
    });
    
    const newSale = await Sale.findByPk(sale.id, {
      include: [{
        model: Route,
        attributes: ['id', 'name', 'price_usd'],
        include: [{
          model: Country,
          attributes: ['id', 'name', 'currency']
        }]
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Sale created successfully',
      data: newSale
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
    const sale = await Sale.findByPk(req.params.id);
    
    if (!sale) {
      return res.status(404).json({
        success: false,
        message: 'Sale not found'
      });
    }

    const { routeId, sale_date, visa_cost_usd, quantity } = req.body;

    // Если меняются цена или количество, пересчитаем общую стоимость
    let total_cost_usd = sale.total_cost_usd;
    if (routeId || quantity || visa_cost_usd) {
      const route = await Route.findByPk(routeId || sale.routeId);
      if (!route) {
        return res.status(404).json({
          success: false,
          message: 'Route not found'
        });
      }
      const newQuantity = quantity || sale.quantity;
      const newVisaCost = visa_cost_usd || sale.visa_cost_usd;
      total_cost_usd = (route.price_usd * newQuantity) + (newVisaCost * newQuantity);
    }

    await sale.update({
      routeId: routeId || sale.routeId,
      sale_date: sale_date || sale.sale_date,
      visa_cost_usd: visa_cost_usd || sale.visa_cost_usd,
      quantity: quantity || sale.quantity,
      total_cost_usd
    });
    
    const updatedSale = await Sale.findByPk(sale.id, {
      include: [{
        model: Route,
        attributes: ['id', 'name', 'price_usd'],
        include: [{
          model: Country,
          attributes: ['id', 'name', 'currency']
        }]
      }]
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
    const sale = await Sale.findByPk(req.params.id);
    
    if (!sale) {
      return res.status(404).json({
        success: false,
        message: 'Sale not found'
      });
    }

    await sale.destroy();
    
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

// Получить статистику по странам
exports.getSalesStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const whereClause = {};
    if (startDate || endDate) {
      whereClause.sale_date = {};
      if (startDate) whereClause.sale_date[Op.gte] = startDate;
      if (endDate) whereClause.sale_date[Op.lte] = endDate;
    }

    const stats = await Sale.findAll({
      where: whereClause,
      include: [{
        model: Route,
        attributes: ['id', 'name'],
        include: [{
          model: Country,
          attributes: ['id', 'name', 'currency']
        }]
      }],
      attributes: [
        [sequelize.fn('SUM', sequelize.col('quantity')), 'total_quantity'],
        [sequelize.fn('SUM', sequelize.col('total_cost_usd')), 'total_revenue'],
        [sequelize.fn('COUNT', sequelize.col('Sale.id')), 'total_sales']
      ],
      group: ['Route.Country.id', 'Route.Country.name', 'Route.Country.currency'],
      raw: true
    });

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales statistics',
      error: error.message
    });
  }
};