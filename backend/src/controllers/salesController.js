const salesService = require('../services/salesService');

const getAll = async (req, res) => {
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

module.exports = {
  getAll,
  getById,
};