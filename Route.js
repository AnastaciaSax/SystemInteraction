const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Route = sequelize.define('Route', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price_usd: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0
    }
  },
  photo_url: {
    type: DataTypes.TEXT,
    validate: {
      isUrl: true
    }
  },
  description: {
    type: DataTypes.TEXT
  },
  duration_days: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'route',
  timestamps: false
});

module.exports = Route;