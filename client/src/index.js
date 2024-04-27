// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
// import { makeServer } from './server';
import App from './App';
// import { ConversationProvider } from './Components/ConversationContext';


// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

ReactDOM.render(
  <React.StrictMode>
  {/* <ConversationProvider> */}
    <App />
  {/* </ConversationProvider> */}

  </React.StrictMode>,
  document.getElementById('root')
);