// imports
const express = require('express');
const { addChat, getChat } = require('./controllers/chat_controller.js');
const { uploadFile, getFile } = require('./controllers/file_controller.js');
const upload = require('./utils/upload.js');

// setup router 
const router = express.Router();

// chat routes
router.post('/chats/add', addChat);
router.post('/chats/get', getChat)


// file routes
router.post('/file/upload', upload.single('file'), uploadFile);
router.get('file/get/:filename', getFile);

module.exports = router;