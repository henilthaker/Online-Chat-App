// imports
const express = require('express');
const { addChat, getChat } = require('./controllers/chat_controller.js');
const { uploadFile, getFile } = require('./controllers/file_controller.js');
const { newMessage, getMessage } = require('./controllers/message_controller.js');
const { addUser, getUser } = require('./controllers/user_controller.js');
const upload = require('./utils/upload.js');
const {getAllRooms, createRoom, newRoomMessage, addUser} = require('./controllers/room_controller.js');

// setup router 
const router = express.Router();

// chat routes
router.post('/chats/add', addChat);
router.post('/chats/get', getChat);


// message routes
router.post('/message/new', newMessage);
router.get('/message/get/:id', getMessage);


// user routes
router.post('/user/add', addUser);
router.get('/user/get', getUser);


// file routes
router.post('/file/upload', upload.single('file'), uploadFile);
router.get('/file/:filename', getFile);

// room routes
router.get('/getRooms', getAllRooms);
router.post('/createRoom', createRoom);
router.post('/room-message/new', newRoomMessage);
router.post('/joinRoom', addUser);
// router.post('/getRooms',getFilter)

module.exports = router;