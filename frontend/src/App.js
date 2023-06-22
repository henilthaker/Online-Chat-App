import SignUp from "./components/SignUp";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";

//APP
function App() {
  return (
    <div>
      <Home/>
      {/* <GoogleOAuthProvider className="App" clientId={process.env.REACT_APP_client_ID}>
        <SignUp />
        <ToastContainer />
      </GoogleOAuthProvider> */}
    </div>
  );
}

export default App;
