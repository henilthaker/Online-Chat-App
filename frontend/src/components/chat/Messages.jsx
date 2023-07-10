import { Box, styled } from '@mui/material';
import AccountContext from '../../context/accountContext/AccountDetails';
import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from '../../Axios.js';
import '../../styles/message.css';
import { PictureAsPdf, GetAppRounded } from '@mui/icons-material';
import Pusher from 'pusher-js';


//components
import Footer from './Footer';
import { MessageContex } from '../../context/messageContext/messageContext';

const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;

const Component = styled(Box)`
    height: 79vh;
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
    const scroll_ref = useRef(null);
    const { account, chat, setChat } = useContext(AccountContext);
    const { messages, dispatch } = useContext(MessageContex);
    const [file, setFile] = useState();
    const [Image, setImage] = useState('');

    const downLoadMedia = (e, url) => {
        e.preventDefault();
        try {
            fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    const url2 = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url2;

                    a.download = url.split('/').pop().split('_')[0].split('file')[0];
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url2);
                });
        } catch (error) {
            console.log(error);
        }
    }

    let cur_date = '';

    const getMessages = async () => {
        try {
            const response = await axios.get(`/message/get/${chat._id}`);
            dispatch({ type: 'SET_MESSAGES', payload: response.data });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMessages();
    }, [chat]);

    useEffect(() => {
        const puhser = new Pusher('8de87b75a39cda78cd32', {
            cluster: 'ap2'
        });

        const channel = puhser.subscribe('messages');
        channel.bind('inserted', (newMessage) => {
            // this useEffect is ran multiple times so 2nd condition in if is to avoid this
            if (newMessage.chatId === chat._id) {
                dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
                setChat(prevChat => {
                    return { ...prevChat, last_message: newMessage.text };
                });
                console.log(chat.last_message);
            }
        });

        return () => {
            puhser.unbind_all();
            puhser.unsubscribe();
        }
    }, [messages]);

    useEffect(() => {
        scroll_ref.current?.scrollTo(0, scroll_ref.current.scrollHeight);
    }, [messages]);

    return (
        <Wrapper>
            <Component ref={scroll_ref}>
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
                                {
                                    message.type === 'file' ?
                                        <Box className={`messageBox relative w-fit ${message.senderId === account.sub && 'sentMessage'}`}>
                                            {(message.text.includes('.jpg') || message.text.includes('.png')) ? <Box className='relative'><img src={message.text} alt='img' className='rounded-sm pr-2' /><GetAppRounded onClick={(e) => downLoadMedia(e, message.text)} className='text-gray-500 absolute bottom-0 right-2' /> </Box> : <Box>
                                                <p className='flex gap-2'><PictureAsPdf className='text-red-500' />
                                                    <p className='pl-1 pr-8'>{message.text.split('/').pop().split('_')[0].split('file')[0]}</p></p>
                                                <GetAppRounded onClick={(e) => { downLoadMedia(e, message.text) }} className='text-gray-500 absolute bottom-0 right-0' />
                                            </Box>}
                                        </Box>
                                        :
                                        <Box className={`messageBox relative w-fit ${message.senderId === account.sub && 'sentMessage'}`}>
                                            {message.text}
                                            <span className="time">{formatDate(message.updatedAt)}</span>
                                        </Box>
                                }
                            </div>
                        </ React.Fragment>
                    )
                })}
            </Component>
            <Footer file={file} setFile={setFile} setImage={setImage} Image={Image}/>
        </Wrapper>
    )
}

export default Messages;