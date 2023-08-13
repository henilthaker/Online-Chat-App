import "../styles/rooms.css"
import { useState } from "react";
import axios from "../Axios";
const { v4: uuidv4 } = require("uuid");
const CreateRoom = () => {
    const [avatarName, setAvatarName] = useState('');
    const [tags, setTags] = useState([]);
    const [roomName, setRoomName] = useState('');

    const handleAvatarNameChange = (e) => {
        setAvatarName(e.target.value);
    };

    const handleInterestChange = (e) => {
        const interestValue = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setTags((prevTags) => [...prevTags, interestValue]);
        } else {
            setTags((prevTags) =>
                prevTags.filter((interest) => interest !== interestValue)
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            name: avatarName,
            id: uuidv4()
        }
        sessionStorage.setItem('user', JSON.stringify(user));

        try {
            const response = await axios.post(`/createRoom`, { name: roomName, tags, createdBy: avatarName, creatorId: user.id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            sessionStorage.setItem('room', JSON.stringify(response.data));
            window.location.href=`/room/${response.data.id}`
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="roomName">RoomName Name:</label>
                        <input
                            type="text"
                            id="roomName"
                            value={roomName}
                            onChange={(e) => {setRoomName(e.target.value) }}
                            required
                        />
                    </div>
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
                        <label>Tags:</label>
                        <div className="checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    value="Technology"
                                    onChange={handleInterestChange}
                                    checked={tags.includes('Technology')}
                                />
                                Technology
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Travel"
                                    onChange={handleInterestChange}
                                    checked={tags.includes('Travel')}
                                />
                                Travel
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Sports"
                                    onChange={handleInterestChange}
                                    checked={tags.includes('Sports')}
                                />
                                Sports
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Books"
                                    onChange={handleInterestChange}
                                    checked={tags.includes('Books')}
                                />
                                Books
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Books"
                                    onChange={handleInterestChange}
                                    checked={tags.includes('Movies')}
                                />
                                Movies
                            </label>
                            {/* Add more interest tags as needed */}
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Create Room</button>
                </form>
            </div>
        </div>
    )
}
export default CreateRoom;