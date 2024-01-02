const express = require('express');
const router = express.Router();
const pool = require('../config/dbcon');

router.post("/post-comment", (req, res) => {
  if (!req.user) {
    req.flash('error', 'You need to login first to leave some comments.');
    res.redirect('/login');

  } else {
    var comment = req.body.comment;
    var target_id = req.body.targetUserId;

    pool.getConnection((err, conn) => {
      if (err) {
        throw err;
      } else {
        conn.query(`INSERT INTO comments (from_user_id, to_user_id, comment_text) VALUES (?, ?, ?)`, [req.user.id, target_id, comment], (err, result) => {
          if (err) {
            throw err;
          } else {
            res.redirect(`/users/${target_id}`);
          }
        })
      }
      conn.release();
    })
  }
})

module.exports = router;