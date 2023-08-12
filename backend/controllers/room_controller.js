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

let rooms = [new Room("SpaceX Initiatives", ["Blockchain", "Technology"], "Henil"), new Room("Crypto Discussion Forum", ["Blockchain", "Technology"], "Henil"), new Room("Crypto Discussion Forum", ["Blockchain", "Technology"], "Henil")];

const getAllRooms=(req,res)=>{
    res.status(200).json(rooms);
}

const createRoom=(req, res)=>{
    const {name, tags, createdBy} = req.body;
    const new_room = new Room(name, tags, createdBy);
    rooms.push(new_room);
    res.status(200).json(new_room);
}

const newRoomMessage = (req,res)=>{
    pusher.trigger('room-messages', 'inserted', req.body);
    res.status(200).json('message sent successfully');
}

const addUser = (req, res)=>{
    res.status(200).json('user added successfully');
}

module.exports = {getAllRooms, createRoom, newRoomMessage, addUser};