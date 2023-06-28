import '../styles/sidebar.css';
import Divider from '@mui/material/Divider';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SingleChat from './SingleChat';
import axios from '../Axios.js';
import React, { useState, useEffect, useContext } from 'react';
import AccountContext from '../context/accountContext/AccountDetails';
const SideBar = () => {
    const [users, setUsers] = useState([]);
    const { account } = useContext(AccountContext);

    const getUsers = async (text = '') => {
        try {
            const response = await axios.get('/user/get');
            // console.log(response.data);
            const filteredUsers = response.data.filter((user) => {
                return user.name.toLowerCase().includes(text.toLowerCase());
            });
            setUsers(filteredUsers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="sidebar min-w-[25vw]">
            <div className="sidebar_header">
                <b><div className="sidebar_title">Chats</div></b>
                <img src={account.picture} alt="profile" className="h-[40px] rounded-full" />
            </div>
            <Divider variant="middle" />
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or start new chat" type="text" onChange={(e)=>getUsers(e.target.value)}/>
                </div>
            </div>
            <div className="chatList">
                {
                    users && users.map((user, index) => (
                        user.sub !== account.sub &&
                        // <> is shorthand syntax for <React.Fragment> but you can't write <key={...}> so we need to write React.Fragment
                        <React.Fragment key={user.sub}>
                            <SingleChat user={user} />
                            {
                                users.length !== (index + 1) && <Divider variant='middle' />
                            }
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}
export default SideBar;