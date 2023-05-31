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

const createSale = async (array) => {
  const saleProducts = await salesModel.createSale(array);
  if (!saleProducts) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: saleProducts };
};

module.exports = {
  getAll,
  getById,
  createSale,
};