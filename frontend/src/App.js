import SignUp from "./components/SignUp";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from "react";
import AccountContext from "./context/accountContext/AccountDetails";
import Home from "./pages/Home.jsx";
import Pusher from 'pusher-js';
import MessageContex from "./context/messageContext/messageContext";
//APP
function App() {
  const { account, setUsers, users } = useContext(AccountContext);
  const { messages, setMessages } = useContext(MessageContex);

  useEffect(() => {
      const puhser = new Pusher('8de87b75a39cda78cd32', {
        cluster: 'ap2'
      });

      const channel = puhser.subscribe('messages');
      channel.bind('inserted', (newMessage) => {
        setMessages([...messages, newMessage]);
      });

      channel.bind('loggedIn', (newUser) => {
        setUsers([...users, newUser]);
      });

      return()=>{
        puhser.unbind_all();
        puhser.unsubscribe();
      }
  },[messages, setMessages, setUsers, users]);

  return (
    <div className="app">
      {
        account ? <Home />
          :
          <GoogleOAuthProvider className="App" clientId={process.env.REACT_APP_client_ID}>
              <SignUp />
              <ToastContainer />
          </GoogleOAuthProvider>
      }
    </div>
  );
}

export default App;
