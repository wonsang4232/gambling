const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController');

router.get('/chat', chatController.Chatroom);
router.get('/chat/:roomcode', chatController.renderChatpage);

module.exports = router;