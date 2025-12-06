const { Country, Route } = require('../models');

// Получить все страны с пагинацией, сортировкой, фильтрацией
exports.getAllCountries = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortOrder = 'asc',
      search,
      currency
    } = req.query;

    const skip = (page - 1) * limit;
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Создаем фильтры
    const filters = {};

    // Поиск по названию страны
    if (search) {
      filters.name = { $regex: search, $options: 'i' };
    }

    // Фильтрация по валюте
    if (currency) {
      filters.currency = currency;
    }

    // Получаем страны с виртуальным полем routesCount
    const countries = await Country.find(filters)
      .populate({
        path: 'routesCount',
        select: '_id'
      })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Country.countDocuments(filters);

    res.json({
      success: true,
      data: countries,
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
      message: 'Error fetching countries',
      error: error.message
    });
  }
};

// Получить страну по ID
exports.getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id)
      .populate({
        path: 'routes',
        select: 'name price_usd duration_days is_active',
        options: { limit: 10 }
      });

    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    // Получаем статистику по продажам для этой страны
    const salesStats = await Route.aggregate([
      {
        $match: { country: country._id }
      },
      {
        $lookup: {
          from: 'sales',
          localField: '_id',
          foreignField: 'route',
          as: 'sales'
        }
      },
      {
        $unwind: '$sales'
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: '$sales.total_cost_usd' },
          totalTravelers: { $sum: '$sales.quantity' }
        }
      }
    ]);

    const countryData = country.toObject();
    if (salesStats.length > 0) {
      countryData.salesStats = salesStats[0];
    }

    res.json({
      success: true,
      data: countryData
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
    const { name, currency } = req.body;

    // Проверка на уникальность названия страны
    const existingCountry = await Country.findOne({ 
      name: { $regex: `^${name}$`, $options: 'i' } 
    });

    if (existingCountry) {
      return res.status(400).json({
        success: false,
        message: 'Country with this name already exists'
      });
    }

    const country = await Country.create({ name, currency });

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
    const { name, currency } = req.body;

    // Проверка существования страны
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    // Проверка уникальности названия (если меняется)
    if (name && name !== country.name) {
      const existingCountry = await Country.findOne({ 
        name: { $regex: `^${name}$`, $options: 'i' },
        _id: { $ne: country._id }
      });

      if (existingCountry) {
        return res.status(400).json({
          success: false,
          message: 'Country with this name already exists'
        });
      }
    }

    // Обновление страны
    const updatedCountry = await Country.findByIdAndUpdate(
      req.params.id,
      { name, currency },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Country updated successfully',
      data: updatedCountry
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
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({
        success: false,
        message: 'Country not found'
      });
    }

    // Проверка на существование связанных маршрутов
    const routesCount = await Route.countDocuments({ country: country._id });
    if (routesCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete country with existing routes'
      });
    }

    await Country.findByIdAndDelete(req.params.id);

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

// Проверить существование страны
exports.checkCountryExists = async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Country name is required'
      });
    }

    const country = await Country.findOne({ 
      name: { $regex: `^${name}$`, $options: 'i' } 
    });

    res.json({
      success: true,
      exists: !!country,
      data: country || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking country',
      error: error.message
    });
  }
};