import AccountContext from "./AccountDetails";
import {useState} from 'react';

const AccountState = (props) => {

    const [account, setAccount] = useState(null);
    const [person, setPerson] = useState({});

    return (
        <AccountContext.Provider value={{account, setAccount, person, setPerson}}>
            {props.children}
        </AccountContext.Provider>
)}

export default AccountState;