import { Box, Typography, styled } from '@mui/material';
import '../styles/chat.css';
import React, { useContext } from 'react';

//components
import Messages from '../components/chat/Messages';

const RoomChatBox = () => {
    return (
        <Box className="min-w-[75vw]">
            <Box className="Header my-2">
                <Box>
                    <Typography className='Name'>Room</Typography>
                </Box>
            </Box>
            <Messages type="room"/>
        </Box>
    )
}
export default RoomChatBox