import { Box, Typography, styled } from '@mui/material';
import '../../styles/chat.css';
import React from 'react';

const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const ChatHeader = ({ person }) => {  
    return (
        <Box className="Header my-2">
            <Image src={person.picture} alt="display picture" />     
            <Box>
                <Typography className='Name'>{person.name}</Typography>
                {/* <Typography className='Status'>{ users.find( user => user.sub === person.sub) ? 'Online' : 'Offline'}</Typography>     */}
            </Box>   
        </Box>
    )
}

export default ChatHeader;