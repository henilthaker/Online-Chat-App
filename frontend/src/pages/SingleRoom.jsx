import ChatBox from "../components/RoomChatBox";
import SideBar from "../components/RoomSideBar";
import '../styles/home.css';

const SingleRoom = ()=>{
    return(
        <div className="home -mt-2">
            <div className="home_body h-screen -mb-3">
                <SideBar />
                <ChatBox />
            </div>
        </div>
    )
}

export default SingleRoom;