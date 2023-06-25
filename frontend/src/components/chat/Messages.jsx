import { Box, styled } from '@mui/material';
import AccountContext from '../../context/AccountDetails';
import { useState, useContext, useEffect } from 'react';
import axios from '../../Axios.js';
import '../../styles/message.css';

//components
import Footer from './Footer';

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;

const Component = styled(Box)`
    height: 69vh;
    overflow-y: scroll;
`;


const Messages = () => {
    const { account, chat } = useContext(AccountContext);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await axios.get(`/message/get/${chat._id}`);
                setMessages(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getMessages();
    }, [chat]);
    console.log(messages.length);
    return (
        <Wrapper>
            <Component>
                {messages && messages.map(message => (
                    <div className = "messageContainer" key={message._id}>
                        <Box className={`messageBox ${message.senderId === account.sub && 'sentMessage'}`}>
                            {message.text}
                        </Box>
                    </div>
                ))}
            </Component>
            <Footer />
        </Wrapper>
    )
}

export default Messages;