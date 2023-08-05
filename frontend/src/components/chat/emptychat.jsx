import { Box, styled, Typography} from '@mui/material';
import '../../styles/empthchat.css';
import emptyChatImage from '../../assets/select.jpg';

const Image = styled('img')({
    // marginTop: 100,
    width: 400
})

const EmptyChat = () => {
    
    return (
        <Box className='Component text-center min-w-[75vw]'>
            <Image src={emptyChatImage} alt="empty" className="mx-auto mb-10 mt-20"/>
            <Box className='Container'>
                <Typography className='SubTitle'>Select a chat to start messaging</Typography>
            </Box>
        </Box>
    )
}

export default EmptyChat;