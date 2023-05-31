const salesModel = require('../models/salesModel');

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

const createNewSale = async (productList) => {
  const saleId = await salesModel.createSale();
  await salesModel.addItemsToSale(saleId, productList);
  const itemsSold = productList.map(({ productId, quantity }) => ({ productId, quantity }));
  return { id: saleId, itemsSold };
};

module.exports = {
  getAll,
  getById,
  createNewSale,
};