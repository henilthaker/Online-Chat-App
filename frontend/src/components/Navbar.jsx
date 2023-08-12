import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <h2>Chatify</h2>
            </Link>
            <div className="links">
                <Link to="/anonymous-rooms">Anonyms Rooms</Link>
                <Link to="/chats">Chats</Link>
            </div>
        </nav>
    );
}
export default Navbar;