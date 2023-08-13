require('dotenv').config();
const Room = require('../models/room_model');
const Pusher = require('pusher');
const { v4: uuidv4 } = require("uuid");


const pusher = new Pusher({
    appId: "1625017",
    key: "8de87b75a39cda78cd32",
    secret: process.env.PUSHER_SECRET,
    cluster: "ap2",
    useTLS: true
});

let rooms = [];

const getAllRooms = (req, res) => {
    res.status(200).json(rooms);
}

const createRoom = (req, res) => {
    const { name, tags, createdBy } = req.body;
    const new_room = new Room(name, tags, createdBy);
    new_room.addUser({name: req.body.createdBy, id: req.body.creatorId});
    rooms.push(new_room);
    res.status(200).json(new_room);
}

const newRoomMessage = (req, res) => {
    pusher.trigger('room-messages', 'inserted', req.body);
    res.status(200).json('message sent successfully');
}

const addRoomUser = (req, res) => {
    try {
        const requiredRoom = rooms.filter(room => room.id === req.body.roomId)[0];
        if (requiredRoom) {
            requiredRoom.addUser({name: req.body.name, id: req.body.id});
            pusher.trigger('user-channel', 'joined', requiredRoom);
        }
        res.status(200).json(requiredRoom);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const removeRoomUser = (req, res) => {
    try {
        const requiredRoom = rooms.filter(room => room.id === req.body.roomId)[0];
        if (requiredRoom && requiredRoom.users.length <= 1) {
            rooms = rooms.filter(room => room.id !== requiredRoom.id);
        }
        else if (requiredRoom) {
            requiredRoom.removeUser(req.body);
            pusher.trigger('user-channel', 'left', requiredRoom);
        }
        res.status(200).json('user removed successfully');
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = { getAllRooms, createRoom, newRoomMessage, addRoomUser, removeRoomUser };