const { Router } = require('express');
const productsController = require('../controllers/productsController');
const validateName = require('../middleware/validateName');

const productsRouter = Router();

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.post(
  '/', 
validateName,
productsController.create,
);

module.exports = productsRouter;