const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

// CRUD операции
router.get('/', countryController.getAllCountries);
router.get('/:id', countryController.getCountryById);
router.post('/', countryController.createCountry);
router.put('/:id', countryController.updateCountry);
router.delete('/:id', countryController.deleteCountry);

// Дополнительные операции
router.get('/check/exists', countryController.checkCountryExists);

module.exports = router;