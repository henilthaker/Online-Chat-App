// imports
const express = require('express');
const { addChat, getChat } = require('./controllers/chat_controller');

// setup router 
const router = express.Router();

// chat routes
router.post('/chats/add', addChat);
router.post('/chats/get', getChat)

module.exports = router;