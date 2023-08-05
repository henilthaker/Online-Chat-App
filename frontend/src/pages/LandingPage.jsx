import { Box, styled, Typography } from '@mui/material';
import '../styles/landingpage.css';
import bgImage from '../assets/chat.jpg';
import Navbar from '../components/Navbar';

const Image = styled('img')({
    width: 400
})

const LandingPage = () => {

    return (
        <Box className='Component text-center min-w-[75vw]'>
            <Navbar />
            <Image src={bgImage} alt="empty" className="mx-auto mt-10" />
            <Box className='Container'>
                <Typography className='Title'>Welcome to Chatify</Typography>
                <Typography className='SubTitle'>Connect to your friends and family seamlessly with Chatify</Typography>
            </Box>
        </Box>

    )
}

export default LandingPage;