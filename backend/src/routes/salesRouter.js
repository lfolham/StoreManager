const { Router } = require('express');
const salesController = require('../controllers/salesController');

const productsRouter = Router();

productsRouter.get('/', salesController.getAll);
productsRouter.get('/:id', salesController.getById);

module.exports = productsRouter;