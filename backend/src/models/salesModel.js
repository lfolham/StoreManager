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

const createSaleId = async () => {
  const [{insertId}] = await connection.execute('INSERT INTO StoreManager.sales () VALUES ();');
  return insertId;
};

const addItemsToSale = async (saleId, objSales) => {
  const sql = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const values = [saleId, objSales.productId, objSales.quantity];
  await connection.execute(sql, values);

  const sqlSearch = 'SELECT product_id AS productId, quantity FROM sales_products WHERE sale_id = ?';
  const valuesSearch = [saleId];
  const [result] = await connection.execute(sqlSearch, valuesSearch);

  return result;
};


module.exports = {
  getAll,
  getById,
  addItemsToSale,
  createSaleId,
};
