import SignUp from "./components/SignUp";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountState from "./context/AccountState";

//APP
function App() {
  return (
    <GoogleOAuthProvider className="App" clientId={process.env.REACT_APP_client_ID}>
      <AccountState>
      <SignUp />
      <ToastContainer />
      </AccountState>
    </GoogleOAuthProvider>
  );
}

export default App;
