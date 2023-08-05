import { Box, styled, Typography } from '@mui/material';
import '../styles/landingpage.css';
import bgImage from '../assets/login.jpg';
import SignUp from "../components/SignUp";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';

const Image = styled('img')({
    width: 350
})

const ChatLogin = () => {

    return (
        <Box className='Component text-center min-w-[75vw]'>
            <Navbar />
            <Image src={bgImage} alt="empty" className="mx-auto mt-10 mb-4" />
            <Box className='Container'>
                {/* <Typography className='Title'>Welcome to Chatify</Typography> */}
                <Typography className='SubTitle'>Please login to access your chats</Typography>
                <GoogleOAuthProvider className="App" clientId={process.env.REACT_APP_client_ID}>
                    <SignUp />
                    <ToastContainer />
                </GoogleOAuthProvider>
            </Box>
        </Box>
    )
}

export default ChatLogin;