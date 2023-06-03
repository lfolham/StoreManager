const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
  .execute('SELECT * FROM StoreManager.products');
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection
  .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return result;
};

const create = async (name) => {
  await connection
  .execute('INSERT INTO StoreManager.products (name) VALUE (?)', [name]);
  const [[result]] = await connection
  .execute('SELECT * FROM StoreManager.products WHERE name = ?', [name]);
  return result;
};

const updateProduct = async (id, name) => {
  await connection
  .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id]);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateProduct,
};