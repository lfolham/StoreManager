const productsService = require('../services/productsServices');

const getAll = async (_req, res) => {
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

const create = async (req, res) => {
  const { name } = req.body;
  const { message } = await productsService.create(name);

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const { type, message } = await productsService.updateProduct(id, name);
    if (type) {
      return res.status(404).json({ message });
    }

    return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productsService.deleteProduct(id);
    
    if (type) {
      return res.status(404).json({ message });
    }

    return res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  create,
  updateProduct,
  deleteProduct,
};