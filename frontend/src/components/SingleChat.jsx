import '../styles/singlechat.css';
import axios from '../Axios.js';
import { useContext } from 'react';
import AccountContext from '../context/AccountDetails';
const SingleChat = ({ user }) => {
    const { account, setPerson } = useContext(AccountContext);
    const createChat = async (e) => {
        setPerson(user);
        e.preventDefault();
        const body = { sender_id : account.sub, receiver_id : user.sub };
        await axios.post('/chats/add',body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    return (
        <div className="singleChat" onClick={createChat}>
            <img src={user.picture} className="rounded-full h-[40px]" alt='profile-pic' />
            <div className="singleChat_details">
                <b><div className="personName">{user.name}</div></b>
                <p className="lastMessage">This is the last message</p>
            </div>
        </div>
    );
}
export default SingleChat;