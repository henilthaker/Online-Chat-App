import SideBar from "../components/SideBar";
import ChatBox from "../components/chat/ChatBox";
import EmptyChat from "../components/chat/emptychat";
import { useContext } from "react";
import AccountContext from "../context/accountContext/AccountDetails";
import '../styles/home.css';
const Home = () => {
    const { person } = useContext(AccountContext);
    return (
        <div className="home">
            <div className="home_body">
                <SideBar />
                {Object.keys(person).length === 0 ? <EmptyChat /> : <ChatBox />}
            </div>
        </div>
    )
}
export default Home;