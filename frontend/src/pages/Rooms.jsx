import Navbar from "../components/Navbar";
import "../styles/rooms.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../Axios"
const { v4: uuidv4 } = require("uuid");

const RoomPage = () => {
    const [avatarName, setAvatarName] = useState('');
    const [interests, setInterests] = useState([]);
    const [rooms, setRooms] = useState([]);

    const handleAvatarNameChange = (e) => {
        setAvatarName(e.target.value);
    };

    const handleInterestChange = (e) => {
        const interestValue = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setInterests((prevInterests) => [...prevInterests, interestValue]);
        } else {
            setInterests((prevInterests) =>
                prevInterests.filter((interest) => interest !== interestValue)
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Do something with the gathered data (e.g., submit to backend or display)
        console.log('Avatar Name:', avatarName);
        console.log('Interests:', interests);
    };
    const goToRoom = async(room)=>{
        const avatarName = prompt("Enter your avatar name");
        const user={
            name:avatarName,
            id:uuidv4()
        }
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('room', JSON.stringify(room));
        try {
            const response = await axios.post(`/joinRoom`, {...user, roomId: room.id}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.log(error);
        }
        window.location.href=`/room/${room.id}`;
    }
    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await axios.get(`/getRooms`);
                setRooms(response.data);
                console.log(rooms);
            } catch (error) {
                console.log(error);
            }
        }

        getRooms();
    }, [])
    return (
        <div>
            {/* <h2 class="phantom-title">Anonymous Rooms.</h2> */}
            <Navbar />
            {/* <div className="form-container">
                <h2>User Information Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="avatarName">Avatar Name:</label>
                        <input
                            type="text"
                            id="avatarName"
                            value={avatarName}
                            onChange={handleAvatarNameChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Interests:</label>
                        <div className="checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    value="Technology"
                                    onChange={handleInterestChange}
                                    checked={interests.includes('Technology')}
                                />
                                Technology
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Space"
                                    onChange={handleInterestChange}
                                    checked={interests.includes('Space')}
                                />
                                Space
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Sports"
                                    onChange={handleInterestChange}
                                    checked={interests.includes('Sports')}
                                />
                                Sports
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Cricket"
                                    onChange={handleInterestChange}
                                    checked={interests.includes('Cricket')}
                                />
                                Cricket
                            </label>

                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div> */}

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
                        <button onClick={()=>{(goToRoom(room))}}>
                            <div className="join-room">Join Room</div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default RoomPage