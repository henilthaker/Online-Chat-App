//imports
const User = require('../models/user_model.js');
const Pusher = require('pusher');
const mongoose = require('mongoose');
require('dotenv').config();

// const pusher = new Pusher({
//     appId: "1625017",
//     key: "8de87b75a39cda78cd32",
//     secret: process.env.PUSHER_SECRET,
//     cluster: "ap2",
//     useTLS: true
// });

//Add new User function
const addUser = async (request, response) => {
    let exist = await User.findOne({ email: request.body.email });

    if (exist) {
        // pusher.trigger('users', 'loggedIn', exist);
        response.status(200).json('user already exists');
        return;
    }
    try {
        const newUser = new User(request.body);
        await newUser.save();
        // pusher.trigger('users', 'loggedIn', newUser);
        response.status(200).json(newUser);
    } catch (error) {
        response.status(500).json(error);
    }
}

//Get all users data
const getUser = async (request, response) => {
    try {
        const user = await User.find({});
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error);
    }
}

module.exports = {
    addUser,
    getUser
}