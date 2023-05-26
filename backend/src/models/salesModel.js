const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
  .execute('SELECT * FROM StoreManager.sales');
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection
  .execute('SELECT * FROM sales ORDER BY saleId ASC, productId ASC, WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
};