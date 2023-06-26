import { Box, styled, Typography, Divider } from '@mui/material';
import '../../styles/empthchat.css';
import emptyChatImage from '../../assets/chat.jpg';

const Image = styled('img')({
    // marginTop: 100,
    width: 400
})

const EmptyChat = () => {
    
    return (
        <Box className='Component text-center min-w-[66vw]'>
            <Image src={emptyChatImage} alt="empty" className="mx-auto mb-10"/>
            <Box className='Container'>
                <Typography className='Title'>Chat Online</Typography>
                <Typography className='SubTitle'>Now send and receive messages with this app</Typography>
                <Typography className='SubTitle'>Use chat app with many accounts </Typography>
                <Divider className='StyleDivider' />
            </Box>
        </Box>
    )
}

export default EmptyChat;