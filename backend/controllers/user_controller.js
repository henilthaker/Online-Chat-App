//imports
const User = require('../models/user_model');

//Add new User function
const addUser = async (request, response) => {
    try {
        let exist = await User.find({ email: request.body.email });

        if(exist) {
            response.status(200).json('user already exists');
            return;
        }
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