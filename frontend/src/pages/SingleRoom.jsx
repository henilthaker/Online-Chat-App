import ChatBox from "../components/RoomChatBox";
import SideBar from "../components/RoomSideBar";
import '../styles/home.css';
import axios from '../Axios';
import { useEffect } from "react";

const SingleRoom = () => {
    useEffect(() => {
        const handleBeforeUnload = async () => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const room = JSON.parse(sessionStorage.getItem('room'));

            // Before the user logs out, store a flag in localStorage
            localStorage.setItem('logoutFlag', 'true');

            // it is necessary to check the condition in if coz when user clicks on leave room button then I am redirecting the user and before redirecting this request will be made 2nd time if I don't check the condition
            if (user && room) {
                await axios.post('/leaveRoom', { ...user, roomId: room.id }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            if(localStorage.getItem('logoutFlag'))
                window.location.href = "/anonymous-rooms"
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            // Clear the flag from localStorage
            localStorage.removeItem('logoutFlag');
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    return (
        <div className="home -mt-2">
            <div className="home_body h-screen -mb-3">
                <SideBar />
                <ChatBox />
            </div>
        </div>
    )
}

export default SingleRoom;