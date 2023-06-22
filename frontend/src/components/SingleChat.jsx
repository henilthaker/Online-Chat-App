import '../styles/singlechat.css'
import Avatar from '@mui/material/Avatar';
const SingleChat = () => {
    return (
        <div className="singleChat">
            <Avatar />
            <div className="singleChat_details">
                <b><div className="personName">Person Name</div></b>
                <p className = "lastMessage">This is the last message</p>
            </div>
        </div>
    );
}
export default SingleChat;