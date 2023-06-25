import { EmojiEmotions, AttachFile } from '@mui/icons-material';
import { Box, InputBase, styled } from '@mui/material';
import '../../styles/chat.css'
import { useState, useContext } from 'react';
import axios from '../../Axios.js'
import AccountContext from '../../context/AccountDetails';

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Footer = () => {
    const { account, person, chat } = useContext(AccountContext);
    const [message, setMessage] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        const body = {
            chatId : chat._id,
            senderId : account.sub,
            receiverId : person.sub,
            text : message,
            type : 'text'
        };

        await axios.post('/message/new', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setMessage('');
    }
    return (
        <Container>
            <EmojiEmotions />
            <label htmlFor="fileInput">
                <AttachFile className='rotate-45' />
            </label>
            <input
                type='file'
                id="fileInput"
                style={{ display: 'none' }}
            />

            <Box className="Search">
                <form onSubmit={sendMessage}>
                    <InputBase className='InputField'
                        placeholder='Type a message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </form>
            </Box>
        </Container>
    )
}

export default Footer;