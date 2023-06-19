// imports
const express = require('express');
const {addChat} = require('./controllers/chat_controller');

// setup router 
const router = express.Router();

// chat routes
router.post('/chats/add', addChat);

module.exports = router;