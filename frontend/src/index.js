import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AccountState from "./context/accountContext/AccountState";
import MessageState from './context/messageContext/messageState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AccountState>
      <MessageState>
      <App />
      </MessageState>
    </AccountState>
  </React.StrictMode>
);
