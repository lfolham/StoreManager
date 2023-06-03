const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);
    
    if (type) {
      return res.status(404).json({ message });
    }

    return res.status(200).json(message);
};

const createSale = async (req, res) => {
  const arraySales = req.body;
  const result = await salesService.createSale(arraySales);

  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
    return res.status(201).json(result);
};

module.exports = {
  getAll,
  getById,
  createSale,
};