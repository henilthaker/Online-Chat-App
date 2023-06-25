import { Box, styled } from '@mui/material';
import AccountContext from '../../context/AccountDetails';
import React, { useState, useContext, useEffect } from 'react';
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

function getDay(date) {
    // Get the day, month, and year from the date object.
    let day = new Date(date).getDate();
    let month = new Date(date).getMonth() + 1;
    let year = new Date(date).getFullYear();

    // Pad the day and month with zeros if they are less than 10.
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    // Return the date in the format dd-mm-yyyy.
    return `${day}-${month}-${year}`;
}

const formatDate = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

const Messages = () => {
    const { account, chat } = useContext(AccountContext);
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState();
    const [Image, setImage] = useState('');

    let cur_date = '';
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

    return (
        <Wrapper>
            <Component>
                {messages && messages.map(message => {
                    const message_day = getDay(message.updatedAt);
                    let flag = true;
                    if (message_day !== cur_date) {
                        cur_date = message_day;
                        flag = false;
                    }
                    return (
                        <React.Fragment key={message._id}>
                            {
                                !flag && <Box className="date">
                                    {message_day}
                                </Box>
                            }
                            <div className="messageContainer">
                                <Box className={`messageBox ${message.senderId === account.sub && 'sentMessage'}`}>
                                    {message.text}
                                    <span className="time">{formatDate(message.updatedAt)}</span>
                                </Box>
                            </div>
                        </ React.Fragment>
                    )
                })}
            </Component>
            <Footer file={file} setFile={setFile} setImage={setImage} />
        </Wrapper>
    )
}

export default Messages;