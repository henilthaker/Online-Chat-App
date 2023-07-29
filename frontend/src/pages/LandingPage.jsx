import { Box, styled, Typography } from '@mui/material';
import '../styles/landingpage.css';
import bgImage from '../assets/chat.jpg';
import SignUp from "../components/SignUp";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

const Image = styled('img')({
    width: 400
})

const LandingPage = () => {

    return (
        <Box className='Component text-center min-w-[75vw]'>
            <Image src={bgImage} alt="empty" className="mx-auto mt-10" />
            <Box className='Container'>
                <Typography className='Title'>Welcome to Chatify</Typography>
                <Typography className='SubTitle'>Connect to your friends and family seamlessly with Chatify</Typography>
            </Box>
            <GoogleOAuthProvider className="App" clientId={process.env.REACT_APP_client_ID}>
                <SignUp />
                <ToastContainer />
            </GoogleOAuthProvider>
        </Box>

    )
}

export default LandingPage;