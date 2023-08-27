import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AccountState from "./context/accountContext/AccountState";
import {MessageState} from './context/messageContext/messageContext';
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js";

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
