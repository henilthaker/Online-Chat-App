import '../styles/singlechat.css';
import axios from '../Axios.js';
import { useContext, useState, useEffect } from 'react';
import AccountContext from '../context/AccountDetails';
const SingleChat = ({ user }) => {
    const [cur_chat, setCurChat] = useState({});
    const { account, setPerson, setChat } = useContext(AccountContext);

    useEffect(() => {
        const getChat = async () => {
            const body = { sender_id: account.sub, receiver_id: user.sub };
            const response = await axios.post('/chats/add', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setCurChat(response.data);
        };

        getChat();
    },[account.sub, user.sub]);

    const createChat = async (e) => {
        e.preventDefault();
        setPerson(user);
        setChat(cur_chat);
    }
    return (
        <div className="singleChat" onClick={createChat}>
            <img src={user.picture} className="rounded-full h-[40px]" alt='profile-pic' />
            <div className="singleChat_details">
                <b><div className="personName">{user.name}</div></b>
                <p className="lastMessage">{cur_chat.last_message}</p>
            </div>
        </div>
    );
}
export default SingleChat;