const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: result };
};

const create = async (name) => {
  const product = await productsModel.getAll(name);
  return { type: null, message: product };
};

module.exports = {
  getAll,
  getById,
  create,
};