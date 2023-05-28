const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
  .execute(`SELECT sale_id, product_id, quantity, sales.date FROM sales 
      INNER JOIN sales_products ON sales.id = sale_id
      ORDER BY sale_id, product_id;`);
  return result;
};

const getById = async (id) => {
  const [[result]] = await connection
  .execute(`SELECT product_id, quantity, sales.date FROM sales 
      INNER JOIN sales_products ON sales.id = sale_id AND sale_id = ?
      ORDER BY sale_id, product_id;`, [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
};