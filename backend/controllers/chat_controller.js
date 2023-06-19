// imports
const chat = require('../models/chat_model.js');

// define functions
const addChat = async (req, res) => {
    const { sender_id, receiver_id } = req.body;
    const already_exist = await chat.findOne({ members: { $all: [sender_id, receiver_id] } });

    if (already_exist)
        return res.status(200).json('Chat already exists');

    const new_chat = new chat({ members: [sender_id, receiver_id] });

    try {
        const created_chat = await chat.create(new_chat);
        res.status(200).json(created_chat);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getChat = async (req, res) => {
    const { sender_id, receiver_id } = req.body;
    try {
        const required_chat = await chat.findOne({ members: { $all: [sender_id, receiver_id] } });
        res.status(200).json(required_chat);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { addChat, getChat };