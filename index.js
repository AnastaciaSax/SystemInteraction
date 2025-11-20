const sequelize = require('../config/database');
const Country = require('./Country');
const Route = require('./Route');
const Sale = require('./Sale');

// Связи между моделями
Country.hasMany(Route, { foreignKey: 'countryId' });
Route.belongsTo(Country, { foreignKey: 'countryId' });

Route.hasMany(Sale, { foreignKey: 'routeId' });
Sale.belongsTo(Route, { foreignKey: 'routeId' });

module.exports = {
  sequelize,
  Country,
  Route,
  Sale
};