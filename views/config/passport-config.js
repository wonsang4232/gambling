// passport-config.js
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var pool = require('./dbcon');
const bcrypt = require('bcrypt');

// Local Strategy - login
passport.use('local-login',
  new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback : true
  },
  (req, username, password, done) => {

    pool.getConnection((err, conn) => {
      if (err) {
        req.flash('error', 'Server Error');
        console.log("Pool connection error");
        done(null, false, {});
      } else {
        conn.query('SELECT * FROM users WHERE username=?', [username], (err, result) => {
          if (err) {
            req.flash('error', 'Server Error');
            console.log("Query Error");
            done(null, false, {});
          } else if (result[0]) {
            if (bcrypt.compare(password, result[0].password)) {
              done(null, result[0]);
            } else {
              req.flash('error', 'Invalid Password');
              done(null, false, {});
            }
          } else {
            req.flash('error', 'Invalid Username');
            done(null, false, {});
          }
        })
      }
      conn.release();
    })
  }
));

// 사용자를 세션에 저장
passport.serializeUser((user, done) => {
  done(null, user);
});

// 세션에서 사용자 로드
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;