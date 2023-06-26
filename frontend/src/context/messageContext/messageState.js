import React, {useState} from 'react';
import MessageContex from './messageContext.js';

const MessageState =  (props) => {
    const [messages, setMessages] = useState([]);
    return (
        <MessageContex.Provider value={{messages, setMessages}}>
            {props.children}
        </MessageContex.Provider>
    )
}

export default MessageState