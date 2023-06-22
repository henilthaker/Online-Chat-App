import SignUp from "./components/SignUp";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//APP
function App() {
  return (
    <GoogleOAuthProvider className="App" clientId={process.env.REACT_APP_client_ID}>
      <SignUp />
      <ToastContainer />
    </GoogleOAuthProvider>
  );
}

export default App;
