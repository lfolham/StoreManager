const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'db',
  port: process.env.MYSQL_PORT || 33060,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
});

module.exports = connection;