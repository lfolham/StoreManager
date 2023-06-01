const { Router } = require('express');
const salesController = require('../controllers/salesController');
const validateProductId = require('../middleware/validateProductId');
const validateQuantity = require('../middleware/validateQuantity');
// const validateQuantitySales = require('../middleware/validateQuantitySales');

const productsRouter = Router();

productsRouter.get('/', salesController.getAll);
productsRouter.get('/:id', salesController.getById);

productsRouter.post(
'/', 
validateProductId,
validateQuantity,
// validateQuantitySales,
salesController.createSales,
);

module.exports = productsRouter;