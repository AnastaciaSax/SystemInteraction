const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

// CRUD операции
router.get('/', routeController.getAllRoutes);
router.get('/:id', routeController.getRouteById);
router.post('/', routeController.createRoute);
router.put('/:id', routeController.updateRoute);
router.delete('/:id', routeController.deleteRoute);

// Дополнительные операции
router.get('/check/exists', routeController.checkRouteExists);

module.exports = router;