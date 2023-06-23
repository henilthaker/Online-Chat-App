//imports
const User = require('../models/user_model.js');

//Add new User function
const addUser = async (request, response) => {
    let exist = await User.findOne({ email: request.body.email });

    if (exist) {
        console.log('user already exists');
        response.status(200).json('user already exists');
        return;
    }
    try {
        const newUser = new User(request.body);
        await newUser.save();
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