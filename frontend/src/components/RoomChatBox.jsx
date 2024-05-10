import { Box, Typography, styled } from '@mui/material';
import '../styles/chat.css';
import React, { useContext } from 'react';

//components
import Messages from '../components/chat/Messages';

const RoomChatBox = () => {
    const room = JSON.parse(sessionStorage.getItem('room'));
    return (
        <Box className="min-w-[75vw]">
            <Box className="Header my-2">
                <Box>
                    <b><Typography className='Name room-name'>{room.name}</Typography></b>
                </Box>
            </Box>
            <Messages type="room" />
        </Box>
    )
}
export default RoomChatBox