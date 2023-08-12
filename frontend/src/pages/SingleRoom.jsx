import ChatBox from "../components/RoomChatBox";
import SideBar from "../components/RoomSideBar";
import '../styles/home.css';
import axios from '../Axios';
import { Room } from "@mui/icons-material";
import { useEffect } from "react";

const SingleRoom = () => {
    useEffect(() => {
        const handleBeforeUnload = async () => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const room = JSON.parse(sessionStorage.getItem('room'));
            await axios.post('/leaveRoom',{...user, roomId : room.id},{
                headers:{
                    'Content-Type': 'application/json'
                }
            });
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
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