import { Box } from '@mui/material';
import { useContext } from 'react';
import AccountContext from '../../context/accountContext/AccountDetails';

//components
import ChatHeader from './ChatHeader';
import Messages from './Messages';

const ChatBox = () => {
    const { person } = useContext(AccountContext);
    return (
        <Box className="min-w-[75vw]">
            <ChatHeader person={person} />
            <Messages type="chat"/>
        </Box>
    )
}

export default ChatBox;