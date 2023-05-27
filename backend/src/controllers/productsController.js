const productsService = require('../services/productsServices');

const getAll = async (req, res) => {
  const result = await productsService.getAll();
  res.status(200).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productsService.getById(id);
    
    if (type) {
      return res.status(404).json({ message });
    }

    return res.status(200).json(message);
};

module.exports = {
  getAll,
  getById,
};