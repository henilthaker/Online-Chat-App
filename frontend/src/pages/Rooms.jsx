import Navbar from "../components/Navbar";
import "../styles/rooms.css"
import { useEffect, useState } from "react";
import axios from "../Axios"
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import CreateRoom from "./CreateRoom";

const { v4: uuidv4 } = require("uuid");

const RoomPage = () => {
    const [rooms, setRooms] = useState([]);
    const [curRoom, setCurRoom] = useState();
    const [joinOpen, setJoinOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [avatarName, setAvatarName] = useState('');
    const handleCreateClose = ()=>{
        setCreateOpen(false);
    }
    const goToRoom = async (room) => {
        // const avatarName = prompt("Enter your avatar name");
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
                        <button onClick={() => {
                            setCurRoom(room);
                            setJoinOpen(true);
                        }}>
                            <div className="join-room">Join Room</div>
                        </button>
                    </div>
                ))}
                <Dialog open={joinOpen} onClose={() => setJoinOpen(false)}>
                    <DialogContent>
                        {/* <DialogContentText> */}
                        <div className="form-group">
                            <label htmlFor="avatarName">Avatar Name:</label>
                            <input
                                type="text"
                                id="avatarName"
                                value={avatarName}
                                onChange={(e) => { setAvatarName(e.target.value) }}
                                required
                            />
                        </div>
                        {/* </DialogContentText> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setJoinOpen(false);
                            goToRoom(curRoom);
                        }}>Join</Button>

                        <Button onClick={() => setJoinOpen(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <button className="create-btn" title="create your own room" onClick={()=>setCreateOpen(true)}>
                <AddCircleOutlineRoundedIcon className="create-icon" />
            </button>
            <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
                    <DialogContent>
                        <CreateRoom handleClose = {handleCreateClose}/>
                    </DialogContent>
                    {/* Buttons to close the dialog are in CreateRoom */}
                </Dialog>
        </div>
    )
}
export default RoomPage