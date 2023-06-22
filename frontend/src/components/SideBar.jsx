import '../styles/sidebar.css';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SingleChat from './SingleChat';
const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <b><div className = "sidebar_title">Chats</div></b>
                <Avatar />
            </div>
            <Divider variant = "middle"/>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or start new chat" type="text"/>
                </div>
            </div>
            <div className="chatList">
                <SingleChat/>
                <Divider variant = "middle"/>
                <SingleChat/>
                <Divider variant = "middle"/>
                <SingleChat/>
                <Divider variant = "middle"/>
                <SingleChat/>
                
            </div>
        </div>
    )
}
export default SideBar;