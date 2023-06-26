import { EmojiEmotions, AttachFile} from '@mui/icons-material';
import { Box, InputBase, styled } from '@mui/material';
import '../../styles/chat.css'
import { useState, useContext, useEffect } from 'react';
import axios from '../../Axios.js'
import AccountContext from '../../context/AccountDetails';
import SendIcon from '@mui/icons-material/Send';

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

const SendButton = styled(SendIcon)`
    background-color: #128C7E;
    border-radius: 50%;
    padding: 8px;
    cursor: pointer;
    width: 35px;
    height: 35px;
    color: white;
    font-size: 10px;
    box-sizing: border-box;
`;

const Footer = ({file, setFile, setImage, Image}) => {
    const { account, person, chat } = useContext(AccountContext);
    const [message, setMessage] = useState('');

    const uploadFile = async (data) => {
        try {
            const responce = await axios.post('/file/upload', data);
            setImage(responce.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getImage = async () => {
            if(file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);
                await uploadFile(data);
            }
        }
        getImage();
    }, [file]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if(message === '')
            return;
        const body = {
            chatId : chat._id,
            senderId : account.sub,
            receiverId : person.sub,
            text : message,
            type : 'text'
        };

        if(file){
            body.text = Image;
            body.type = 'file';
        }

        await axios.post('/message/new', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setMessage('');
    }

    const onFileChange = async (e) => {
        let files = e.target.files;
        setMessage(files[0]?.name);
        setFile(files[0]);
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
                onChange={(e) => onFileChange(e)}
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
            <SendButton onClick={sendMessage} />
        </Container>
    )
}

export default Footer;