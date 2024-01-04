const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.user) {
        res.locals.nickname = req.user.nickname;
        res.locals.isLoggedIn = true;
    } else {
        res.locals.isLoggedIn = false;
    }
    res.render('index');
});

module.exports = router;