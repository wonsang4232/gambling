const mysql = require('mysql');

// MySQL create pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'dnjs6033',
  database: 'gambling',
  waitForConnections: true,
  connectionLimit: 5,
});

module.exports = pool;