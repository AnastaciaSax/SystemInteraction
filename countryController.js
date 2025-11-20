const { Country, Route, Sale } = require('../models');
const { Op } = require('sequelize');

// Получить все страны с пагинацией, сортировкой, фильтрацией
exports.getAllCountries = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortOrder = 'ASC',
      search
    } = req.query;

    const offset = (page - 1) * limit;
    
    const whereClause = {};

    // Поиск
    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }

    const countries = await Country.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: countries.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(countries.count / limit),
        totalItems: countries.count,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching countries',
      error: error.message
    });
  }
};

// Получить страну по ID
exports.getCountryById = async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id, {
      include: [{
        model: Route,
        include: [{
          model: Sale
        }]
      }]
    });

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    res.json({
      success: true,
      data: country
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching country',
      error: error.message
    });
  }
};

// Создать новую страну
exports.createCountry = async (req, res) => {
  try {
    const country = await Country.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Country created successfully',
      data: country
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating country',
      error: error.message
    });
  }
};

// Обновить страну
exports.updateCountry = async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    
    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    await country.update(req.body);
    
    res.json({
      success: true,
      message: 'Country updated successfully',
      data: country
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating country',
      error: error.message
    });
  }
};

// Удалить страну
exports.deleteCountry = async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    
    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    // Проверка на существование связанных маршрутов
    const routesCount = await Route.count({ where: { countryId: req.params.id } });
    if (routesCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete country with existing routes'
      });
    }

    await country.destroy();
    
    res.json({
      success: true,
      message: 'Country deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting country',
      error: error.message
    });
  }
};