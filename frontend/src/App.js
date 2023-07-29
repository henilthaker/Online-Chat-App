import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from "react";
import AccountContext from "./context/accountContext/AccountDetails";
import Home from "./pages/Home.jsx";
import LandingPage from "./pages/LandingPage";
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

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [users, setUsers]);

  return (
    <div className="app">
      {
        account ? <Home />
          :
          <LandingPage />
      }
    </div>
  );
}

export default App;