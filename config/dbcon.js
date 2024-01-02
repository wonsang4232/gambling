const mysql = require('mysql');

// MySQL create pool
const pool = mysql.createPool({
  host: 'vultr-prod-d88cf96a-dd87-4844-996b-8d088166fb68-vultr-prod-5d9b.vultrdb.com',
  port: 16751,
  user: 'vultradmin',
  password: 'dnjs6033',
  database: 'gambling',
  waitForConnections: true,
  connectionLimit: 5,
});

pool.getConnection((err, conn) => {
  if (err) {
    throw err;
  } else {
    conn.query(`CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      nickname VARCHAR(255) NOT NULL,
      vip_number INT CHECK(vip_number >= 0 AND vip_number <= 2),
      created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      money INT CHECK(money >= 0)
    );
    `, (err, res) => {
      console.log("users DATABASE CREATED.", res);
    });

    conn.query(`CREATE TABLE IF NOT EXISTS comments (  
      comment_id INT AUTO_INCREMENT PRIMARY KEY,
      from_user_id INT,
      to_user_id INT,
      comment_text TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (from_user_id) REFERENCES users(id),
      FOREIGN KEY (to_user_id) REFERENCES users(id)
      );`, (err, res) => {
        console.log("comments DATABASE CREATED.", res);
      })
  }
  conn.release();
})

module.exports = pool;