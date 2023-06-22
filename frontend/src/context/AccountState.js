import AccountContext from "./AccountDetails";
import {useState} from 'react';

const AccountState = (props) => {

    const [account, setAccount] = useState(null);

    return (
        <AccountContext.Provider value={{account, setAccount}}>
            {props.children}
        </AccountContext.Provider>
)}


export default AccountState;