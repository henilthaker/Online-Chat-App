import SideBar from "../components/SideBar";
import ChatBox from "../components/chat/ChatBox";
import EmptyChat from "../components/chat/emptychat";
import '../styles/home.css';
const Home = () => {
    return (
        <div className="home">
            <div className="home_body">
                <SideBar />
                {/* <EmptyChat /> */}
                <ChatBox/>
            </div>
        </div>
    )
}
export default Home;