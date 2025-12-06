const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: [true, 'Route reference is required']
  },
  sale_date: {
    type: Date,
    required: [true, 'Sale date is required']
  },
  visa_cost_usd: {
    type: Number,
    required: [true, 'Visa cost is required'],
    min: [0, 'Visa cost cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  total_cost_usd: {
    type: Number,
    required: [true, 'Total cost is required'],
    min: [0, 'Total cost cannot be negative']
  }
}, {
  timestamps: true
});

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;