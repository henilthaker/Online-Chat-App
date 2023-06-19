// imports
const mongoose  = require('mongoose');

// define schema
const chatSchema = new mongoose.Schema({
    members:{
        type:Array
    },
    last_message:{
        type:String
    }
},{timestamps: true});

module.exports = mongoose.model('chat', chatSchema);