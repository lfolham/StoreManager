const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection
  .execute(`SELECT salesp.sale_id AS saleId, 
    salesp.product_id AS productId, 
    salesp.quantity,s.date    
    FROM sales_products AS salesp 
    INNER JOIN sales AS s ON s.id = salesp.sale_id 
    ORDER BY salesp.sale_id, salesp.product_id;`);
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(`
    SELECT salesp.product_id AS productId, 
    salesp.quantity,
    s.date    
    FROM sales_products AS salesp 
    INNER JOIN sales AS s 
    ON s.id = salesp.sale_id 
    WHERE salesp.sale_id = ?
    ORDER BY salesp.sale_id, salesp.product_id;
  `, [id]);

  return result;
};

const addItemsToSale = async (saleId, productList) => {
  const promises = productList.map(({ productId, quantity }) => {
    const sql = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
    const values = [saleId, productId, quantity];
    return connection.execute(sql, values);
  });
  await Promise.all(promises);
};

const createSale = async () => {
  const [result] = await connection.execute('INSERT INTO StoreManager.sales () VALUES ();');
  const saleId = result.insertId;
  return saleId;
};

module.exports = {
  getAll,
  getById,
  addItemsToSale,
  createSale,
};
