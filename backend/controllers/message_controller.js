const Message = require('../modal/message_model.js');
const Chat = require('../modal/chat_model.js');

// Add new message function
export const newMessage = async (request, response) => {
    const newMessage = new Message(request.body);
    try {
        await newMessage.save();
        await Chat.findByIdAndUpdate(request.body.chatId, { message: request.body.text });
        response.status(200).json("Message has been sent successfully");
    } catch (error) {
        response.status(500).json(error);
    }

}

// Get message for particular chat function
export const getMessage = async (request, response) => {
    try {
        const messages = await Message.find({ chatId: request.params.id });
        response.status(200).json(messages);
    } catch (error) {
        response.status(500).json(error);
    }

}