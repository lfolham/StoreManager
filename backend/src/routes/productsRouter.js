const { Router } = require('express');
const productsController = require('../controllers/productsController');
const validateProducts = require('../middleware/validateProducts');

const productsRouter = Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.post(
  '/', 
validateProducts,
productsController.create,
);

module.exports = productsRouter;