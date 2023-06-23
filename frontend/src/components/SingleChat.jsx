import '../styles/singlechat.css'
const SingleChat = ({ user }) => {
    return (
        <div className="singleChat">
            <img src={user.picture} className="rounded-full h-[50px]" alt='profile-pic' />
            <div className="singleChat_details">
                <b><div className="personName">{user.name}</div></b>
                <p className="lastMessage">This is the last message</p>
            </div>
        </div>
    );
}
export default SingleChat;