import '../styles/sidebar.css';
import Divider from '@mui/material/Divider';
import React, { useState, useEffect, useContext } from 'react';
import axios from '../Axios.js';
import Pusher from 'pusher-js';
const RoomSideBar = () => {
    const pusher = new Pusher('8de87b75a39cda78cd32', {
        cluster: 'ap2'
    });

    const room = JSON.parse(sessionStorage.getItem('room'));
    const [users, setUsers] = useState(room.users);

    const leaveRoom = async () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const room = JSON.parse(sessionStorage.getItem('room'));
        await axios.post('/leaveRoom', { ...user, roomId: room.id }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = "/anonymous-rooms";
    };

    useEffect(() => {
        const channel = pusher.subscribe('user-channel');
        channel.bind('joined', (updatedRoom) => {
            sessionStorage.removeItem('room');
            sessionStorage.setItem('room', JSON.stringify(updatedRoom));
            setUsers(updatedRoom.users);
        })
        channel.bind('left', (updatedRoom) => {
            sessionStorage.removeItem('room');
            sessionStorage.setItem('room', JSON.stringify(updatedRoom));
            setUsers(updatedRoom.users);
        })
        return () => {
            pusher.unbind_all();
            pusher.unsubscribe();
        }
    }, [users]);

    return (
        <div className="sidebar min-w-[25vw]">
            <div className="sidebar_header">
                <b><div className="sidebar_title">Users</div></b>
            </div>
            <Divider variant="middle" />
            <div className="chatList">
                {
                    users && users.map((user, index) => (
                        <div className="singleChat" key={user.id}>
                            <div className="singleChat_details">
                                <b><div className="personName">{user.name}</div></b>
                            </div>
                            {users.length !== (index + 1) && <Divider variant='middle' />}
                        </div>
                    ))
                }
            </div>
            <button onClick={leaveRoom}>Leave Room</button>
        </div>
    )
}

export default RoomSideBar;
