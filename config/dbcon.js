const mysql = require('mysql2');

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

// const conn = await pool.getConnection();

pool.getConnection( async (err, conn) => {
  if (err) {
    console.log(err);
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
    );`, () => {
      console.log("users DATABASE CREATED");
    })

    conn.query(`CREATE TABLE IF NOT EXISTS comments (  
      comment_id INT AUTO_INCREMENT PRIMARY KEY,
      from_user_id INT,
      to_user_id INT,
      comment_text TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (from_user_id) REFERENCES users(id),
      FOREIGN KEY (to_user_id) REFERENCES users(id)
      );`, () => {
        console.log("comments DATABASE CREATED.");
      })
  }
  conn.release();
})

module.exports = pool;