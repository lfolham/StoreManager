const { Router } = require('express');
const salesController = require('../controllers/salesController');

const productsRouter = Router();

productsRouter.get('/', salesController.getAll);
productsRouter.get('/:id', salesController.getById);

productsRouter.post('/', salesController.createSales);

module.exports = productsRouter;