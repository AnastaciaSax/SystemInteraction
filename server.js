const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к базе данных
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/countries', require('./routes/countries'));
app.use('/api/routes', require('./routes/routes'));
app.use('/api/sales', require('./routes/sales'));

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    success: true, 
    message: 'Server is running!',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Tour Agency API is running!',
    version: '2.0.0',
    database: 'MongoDB',
    endpoints: {
      countries: {
        list: 'GET /api/countries',
        details: 'GET /api/countries/:id',
        create: 'POST /api/countries',
        update: 'PUT /api/countries/:id',
        delete: 'DELETE /api/countries/:id',
        check: 'GET /api/countries/check?name=:name'
      },
      routes: {
        list: 'GET /api/routes',
        details: 'GET /api/routes/:id',
        create: 'POST /api/routes',
        update: 'PUT /api/routes/:id',
        delete: 'DELETE /api/routes/:id',
        check: 'GET /api/routes/check?name=:name'
      },
      sales: {
        list: 'GET /api/sales',
        details: 'GET /api/sales/:id',
        create: 'POST /api/sales',
        update: 'PUT /api/sales/:id',
        delete: 'DELETE /api/sales/:id',
        stats: 'GET /api/sales/stats',
        check: 'GET /api/sales/check?route=:route&date=:date&quantity=:quantity'
      },
      health: 'GET /api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  
  // Ошибки валидации Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({ 
      success: false, 
      message: 'Validation Error', 
      errors 
    });
  }

  // Ошибки дублирования уникальных полей
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({ 
      success: false, 
      message: `Duplicate value for ${field}` 
    });
  }

  // CastError (неправильный формат ID)
  if (err.name === 'CastError') {
    return res.status(400).json({ 
      success: false, 
      message: `Invalid ${err.path}: ${err.value}` 
    });
  }

  res.status(500).json({ 
    success: false, 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route not found: ${req.method} ${req.originalUrl}` 
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🗄️  Database: MongoDB`);
});

module.exports = app;