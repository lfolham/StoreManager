const { Router } = require('express');
const salesController = require('../controllers/salesController');
const validateProductId = require('../middleware/validateProductId');
const validateQuantity = require('../middleware/validateQuantity');
const validateQuantGreather1 = require('../middleware/validateQuantGreather1');
// const validateUniqueSale = require('../middleware/validateUniqueSale');

const salesRouter = Router();

salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);

salesRouter.post(
'/', 
validateProductId,
validateQuantity,
validateQuantGreather1,
// validateUniqueSale,
salesController.createSale,
);

module.exports = salesRouter;