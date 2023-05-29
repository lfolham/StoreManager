const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute(`
    SELECT sale_id, sales.date, product_id, quantity
    FROM sales 
    INNER JOIN sales_products ON sales.id = sale_id
    ORDER BY sales.date, product_id, quantity;
  `);
  return rows;
};

const getById = async (id) => {
  const [rows] = await connection.execute(`
    SELECT sales.date, product_id, quantity
    FROM sales 
    INNER JOIN sales_products ON sales.id = sale_id AND sale_id = ?
    ORDER BY sales.date, product_id, quantity;
  `, [id]);
    return rows;
  };

module.exports = {
  getAll,
  getById,
};