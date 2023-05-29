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

module.exports = {
  getAll,
  getById,
};