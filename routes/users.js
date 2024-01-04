const express = require('express');
const router = express.Router();
const pool = require('../config/dbcon');
const userpageController = require('../controller/userpageController');

router.get('/users', userpageController.renderUserpage);
router.get('/users/:id', userpageController.renderUserprofile);

module.exports = router;