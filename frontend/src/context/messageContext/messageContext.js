import { createContext, useReducer } from "react";

export const MessageContex = createContext();

const messageReducer = (state, action) => {
    const len = state.length;
    switch (action.type) {
        case 'SET_MESSAGES':
            return action.payload;
        case 'ADD_MESSAGE':
            if(len===0 || state[len-1]._id !==action.payload._id){
                return [...state, action.payload];
            }
            else
                return state;
        default:
            return state;

    }
}

export const MessageState = (props) => {
    const [messages, dispatch] = useReducer(messageReducer, []);
    return (
        <MessageContex.Provider value={{ messages, dispatch }}>
            {props.children}
        </MessageContex.Provider>
    )
}