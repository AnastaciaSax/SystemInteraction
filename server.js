const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/countries', require('./routes/countries'));
app.use('/api/routes', require('./routes/routes'));
app.use('/api/sales', require('./routes/sales'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Sync database and start server
sequelize.sync({ force: false }) // Set force: true to drop and recreate tables
  .then(() => {
    console.log('DB synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the DB:', err);
  });