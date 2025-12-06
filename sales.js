const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// CRUD операции
router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.post('/', saleController.createSale);
router.put('/:id', saleController.updateSale);
router.delete('/:id', saleController.deleteSale);

// Статистика и дополнительные операции
router.get('/stats', saleController.getSalesStats);
router.get('/check/exists', saleController.checkSaleExists);

module.exports = router;