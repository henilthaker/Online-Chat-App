import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from "react";
import AccountContext from "./context/accountContext/AccountDetails";
import Home from "./pages/Home.jsx";
import LandingPage from "./pages/LandingPage";
import Pusher from 'pusher-js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatLogin from './pages/ChatLogin';
//APP
function App() {
  const { account, setUsers, users } = useContext(AccountContext);

  useEffect(() => {
    const pusher = new Pusher('8de87b75a39cda78cd32', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('users');
    channel.bind('loggedIn', (newUser) => {
      setUsers([...users, newUser])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [users, setUsers]);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/chats" element={account ? <Home />:<ChatLogin />} />
          <Route exact path="/chats" element={<LandingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;