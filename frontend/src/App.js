import SignUp from "./components/SignUp";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect} from "react";
import AccountContext from "./context/accountContext/AccountDetails";
import Home from "./pages/Home.jsx";
import Pusher from 'pusher-js';
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

      console.log(users);

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      }
      
  },[users, setUsers]);

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