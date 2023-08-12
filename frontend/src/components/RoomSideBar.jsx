import '../styles/sidebar.css';
import Divider from '@mui/material/Divider';
import React, { useState, useEffect, useContext } from 'react';
import axios from '../Axios.js';

const RoomSideBar = () => {
    const [users, setUsers] = useState([]);

    return (
        <div className="sidebar min-w-[25vw]">
            <div className="sidebar_header">
                <b><div className="sidebar_title">Users</div></b>
            </div>
            <Divider variant="middle" />
            <div className="chatList">
                {
                    users && users.map((user, index) => (
                        <div className="singleChat" key={user.sub}>
                            <div className="singleChat_details">
                                <b><div className="personName">{user.name}</div></b>
                                <p className="lastMessage">{/* You can put any relevant information here */}</p>
                            </div>
                            {users.length !== (index + 1) && <Divider variant='middle' />}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RoomSideBar;
