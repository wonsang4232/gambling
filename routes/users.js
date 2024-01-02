const express = require('express');
const router = express.Router();
const pool = require('../config/dbcon');

router.get('/users', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log("Error creating connection");
      throw err;
    } else {
      conn.query(`SELECT * FROM users ORDER BY money DESC`, (err, result) => {
        res.render('users', { users: result });
      })
    }
    conn.release();
  })
})

// Not implemented Yet lol
router.get('/users/:id', (req, res) => {
  var id = req.params.id;
  res.locals.Owner = false
  res.locals.isLoggedIn = false;
  
  if (req.user) {
      res.locals.isLoggedIn = true;
      if (req.user.id == id) {
          res.locals.Owner = true;
      }
  }

  pool.getConnection((err, conn) => {
    if (err) {
      console.log("Error creating connection");
      throw err;
    } else {
      conn.query(`SELECT * FROM users WHERE id=?`, [id],  (err, result) => {
        conn.query(`SELECT 
        comments.comment_text AS comment, 
        comments.from_user_id, 
        users.nickname AS nickname
        FROM comments
        JOIN users ON comments.from_user_id = users.id
        WHERE comments.to_user_id=?
        ORDER BY comments.created_at DESC;
        `,[id], (err, comments) => {
          res.render('profile', { user : result[0] , comments : comments});
        })
      })
    }
    conn.release();
  })
});

module.exports = router;