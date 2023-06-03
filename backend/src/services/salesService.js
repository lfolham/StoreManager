const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: result };
};

// refatoração de acordo com a mentoria da Mari - valeu Mari!!
const createSale = async (arraySales) => {
  const productsById = await arraySales.map((sale) => productsModel.getById(sale.productId));
  const promisesProducts = await Promise.all(productsById);
  const productNotFound = promisesProducts.some((products) => products === undefined);
  if (productNotFound) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const saleId = await salesModel.createSaleId();
  const promises = await arraySales.map((sale) => salesModel.addItemsToSale(saleId, sale));
  const itemsSold = await Promise.all(promises);

  return { id: saleId, itemsSold: itemsSold[0] };
};

module.exports = {
  getAll,
  getById,
  createSale,
};