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
  return result[0];
};

module.exports = {
  getAll,
  getById,
  create,
};