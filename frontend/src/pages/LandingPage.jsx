import { Box, styled, Typography } from '@mui/material';
import '../styles/landingpage.css';
import bgImage from '../assets/chat.jpg';
import Navbar from '../components/Navbar';

const Image = styled('img')({
    width: 400
})

const LandingPage = () => {

    return (
        <div>
            <Navbar />
            <Box className='Component text-center min-w-[75vw]'>
                <Image src={bgImage} alt="empty" className="mx-auto mt-10" />
                <Box className='Container'>
                    <Typography className='Title'>Welcome to Chatify</Typography>
                    <Typography className='SubTitle'>Connect to your friends and family seamlessly with Chatify</Typography>
                </Box>
            </Box>
        </div>

    )
}

export default LandingPage;