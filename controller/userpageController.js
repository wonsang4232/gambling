pool = require("../config/dbcon");

exports.renderUserpage = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log("Error creating connection");
      res.status(500).send("Internal Server Error");
    } else {
      conn.query(`SELECT * FROM users ORDER BY money DESC`, (err, result) => {
        if (err) {
          res.status(500).send("Internal Server Error");
        } else {
          res.render('users', { users: result });
        }
      })
    }
    conn.release();
  })
}

exports.renderUserprofile = (req, res) => {
  var id = req.params.id;
  // console.log("Rendering : ", id);
  // This renders two times.. but I don't know why lol
  // Give up fuckin nodejs
  
  res.locals.Owner = false
  res.locals.isLoggedIn = false;
  
  if (req.user) {
      res.locals.isLoggedIn = true;
      if (req.user.id == id) {
          res.locals.Owner = true;
      }
  }

  pool.getConnection( async (err, conn) => {
    if (err) {
      console.log("Error creating connection");
      return res.status(500).send("Internal Server Error");
    } else {
      var user_res;
      var comment_res;

      user_res = await conn.promise().query(`SELECT * FROM users WHERE id=?`, [id]).catch(err => {return res.status(500)});
      comment_res = await conn.promise().query(`SELECT 
      comments.comment_text AS comment,
      comments.from_user_id, 
      users.nickname AS nickname
      FROM comments
      JOIN users ON comments.from_user_id = users.id
      WHERE comments.to_user_id=?
      ORDER BY comments.created_at DESC;
      `,[id]).catch(err => {return res.status(500).send("Internal Server Error")});
      
      res.render("profile", {user: user_res[0][0], comments: comment_res[0]});
    }
    conn.release();
  })
}