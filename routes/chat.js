const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');

router.get('/chat', chatController.renderChatpage);

module.exports = router;