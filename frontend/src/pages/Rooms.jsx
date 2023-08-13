import Navbar from "../components/Navbar";
import "../styles/rooms.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../Axios"
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
const { v4: uuidv4 } = require("uuid");

const RoomPage = () => {
    const [rooms, setRooms] = useState([]);
    const goToRoom = async (room) => {
        const avatarName = prompt("Enter your avatar name");
        if (avatarName) {
            const user = {
                name: avatarName,
                id: uuidv4()
            }
            sessionStorage.setItem('user', JSON.stringify(user));
            try {
                const response = await axios.post(`/joinRoom`, { ...user, roomId: room.id }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                sessionStorage.setItem('room', JSON.stringify(response.data));
            } catch (error) {
                console.log(error);
            }
            window.location.href = `/room/${room.id}`;
        }
    }
    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await axios.get(`/getRooms`);
                setRooms(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getRooms();
    }, [])
    return (
        <div>
            <Navbar />
            {rooms.length === 0 && <div className="no-rooms-msg">
                No active rooms
            </div>}
            <div className="room-cards-block">
                {rooms.map((room) => (
                    <div className="room-card" key={room.id}>
                        <h1>{room.name}</h1>
                        <h4>By {room.createdBy}</h4>
                        <div className="tags-section">
                            {room.tags.map((tag, j) => (
                                <div className="tag" key={j}>{tag}</div>
                            ))}
                        </div>
                        <button onClick={() => { (goToRoom(room)) }}>
                            <div className="join-room">Join Room</div>
                        </button>
                    </div>
                ))}
            </div>
            <Link to="/createRoom">
                <button className="create-btn" title="create your own room">
                    <AddCircleOutlineRoundedIcon className="create-icon" />
                </button>
            </Link>
        </div>
    )
}
export default RoomPage