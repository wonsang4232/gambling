var passport = require('../config/passport-config');
var pool = require('../config/dbcon');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.renderLoginPage = (req, res) => {
    const fmsg = req.flash();
    if (fmsg.error) {
        res.locals.errormsg = fmsg.error;
    } else {
        res.locals.errormsg = "";
    }
    res.render('login');
};

exports.renderRegisterPage = (req, res) => {
    const fmsg = req.flash();
    if (fmsg.error) {
        res.locals.errormsg = fmsg.error;
    } else {
        res.locals.errormsg = "";
    }
    res.render('register');
};  

exports.loginUser = (req, res, next) => {
    passport.authenticate('local-login', {
      successRedirect: '/',
      failureRedirect: '/login'
    })(req, res, next);
};

exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
        return next(err);
        } 
        res.redirect("/");
    });        
};

exports.registerUser = (req, res) => {
    var {username, password, nickname} = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error getting connection");
            throw err;
        } else {
            connection.query('SELECT * FROM users WHERE username=?', [username], (err, result) => {
                if (err) {
                    console.log("Error excuting query.");
                    throw err;
                } else if (result[0]){
                    req.flash('error', 'Username Duplicated.');
                    res.redirect('/register')
                } else {
                    var salt = bcrypt.genSaltSync(saltRounds); 
                    const hashed_password = bcrypt.hashSync(password, salt);

                    connection.query(`INSERT INTO users (username, password, nickname, vip_number, money) 
                    VALUES (?,?,?,0,100000)`, [username, hashed_password, nickname], (err, result) => {
                        if (err) {
                            console.log("Insertion Error");
                            throw err;
                        } else {
                            res.redirect('/login');
                        }
                    })
                }
            })
        }
        connection.release();
    })
}