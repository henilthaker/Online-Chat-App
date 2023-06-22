import SignUp from "./components/SignUp";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountState from "./context/AccountState";
import { useContext } from "react";
import AccountContext from "./context/AccountDetails";
import Home from "./pages/Home.jsx";
//APP
function App() {
  const { account } = useContext(AccountContext);
  return (
    <div className="app">
      {
        account ? <Home />
          :
          <GoogleOAuthProvider className="App" clientId={process.env.REACT_APP_client_ID}>
            <AccountState>
              <SignUp />
              <ToastContainer />
            </AccountState>
          </GoogleOAuthProvider>
      }
    </div>
  );
}

export default App;
