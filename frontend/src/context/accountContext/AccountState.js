import AccountContext from "./AccountDetails";
import {useState} from 'react';

const AccountState = (props) => {

    const [account, setAccount] = useState(null);
    const [person, setPerson] = useState({});
    const [chat, setChat] = useState({});
    const [users, setUsers] = useState([]);

    return (
        <AccountContext.Provider value={{account, setAccount, person, setPerson, chat, setChat, users, setUsers}}>
            {props.children}
        </AccountContext.Provider>
)}

export default AccountState;