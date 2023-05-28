const salesModel = require('../models/salesModel');

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (!result) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null, message: result };
};

module.exports = {
  getAll,
  getById,
};