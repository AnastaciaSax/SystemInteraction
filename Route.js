const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Route name is required'],
    trim: true,
    maxlength: [200, 'Route name cannot exceed 200 characters']
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: [true, 'Country reference is required']
  },
  price_usd: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  photo_url: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Tour+Route'
  },
  description: {
    type: String,
    trim: true
  },
  duration_days: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 day']
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;