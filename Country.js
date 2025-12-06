const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Country name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Country name must be at least 2 characters'],
    maxlength: [100, 'Country name cannot exceed 100 characters']
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    trim: true,
    uppercase: true
  }
}, {
  timestamps: true
});

// УБИРАЕМ ВСЕ ВИРТУАЛЬНЫЕ ПОЛЯ - они вызывают ошибки

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;