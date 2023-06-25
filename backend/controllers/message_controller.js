const Message = require('../models/message_model.js');
const Chat = require('../models/chat_model.js');

// Add new message function
const newMessage = async (request, response) => {
    const newMessage = new Message(request.body);
    try {
        await newMessage.save();
        await Chat.findByIdAndUpdate(request.body.chatId, { last_message: request.body.text });
        response.status(200).json("Message has been sent successfully");
    } catch (error) {
        response.status(500).json(error);
    }

}

// Get message for particular chat function
const getMessage = async (request, response) => {
    try {
        const messages = await Message.find({ chatId: request.params.id });
        response.status(200).json(messages);
    } catch (error) {
        response.status(500).json(error);
    }

}

module.exports = {
    newMessage,
    getMessage
}