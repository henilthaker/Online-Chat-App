import { Box, Typography, styled } from '@mui/material';
import '../../styles/chat.css'
    
const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const ChatHeader = ({ person }) => {  

    return (
        <Box className="Header">
            <Image src={""} alt="display picture" />     
            <Box>
                <Typography className='Name'>Henil</Typography>
                <Typography className='Status'>Offline</Typography>    
            </Box>   
        </Box>
    )
}

export default ChatHeader;