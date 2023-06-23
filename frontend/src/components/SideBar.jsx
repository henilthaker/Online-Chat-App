import '../styles/sidebar.css';
import Divider from '@mui/material/Divider';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SingleChat from './SingleChat';
import axios from '../Axios.js';
import { useState, useEffect, useContext } from 'react';
import AccountContext from '../context/AccountDetails';
const SideBar = () => {
    const [users, setUsers] = useState([]);
    const { account } = useContext(AccountContext);
    useEffect(() => {

        const getUsers = async () => {
            try {
                const response = await axios.get('/user/get');
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getUsers();
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <b><div className="sidebar_title">Chats</div></b>
                <img src={account.picture} alt="profile" className="h-[50px] rounded-full" />
            </div>
            <Divider variant="middle" />
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="chatList">
                {
                    users && users.map((user, index) => (
                        user.sub !== account.sub &&
                        <>
                            <SingleChat user={user} />
                            {
                                users.length !== (index + 1) && <Divider variant='middle' />
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}
export default SideBar;