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
  const result = await productsModel.create(name);
  return { type: null, message: result };
};

module.exports = {
  getAll,
  getById,
  create,
};