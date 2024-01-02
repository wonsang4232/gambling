const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')

router.get('/login', authController.renderLoginPage);
router.post('/login', authController.loginUser);

router.get('/logout', authController.logoutUser);

router.get('/register', authController.renderRegisterPage);
router.post('/register', authController.registerUser);

module.exports = router;