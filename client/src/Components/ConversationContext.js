// ConversationContext.js
import React, { createContext, useState } from 'react';

export const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState({});

  const sendMessage = (userName, newMessage) => {
    const updatedConversations = {
      ...conversations,
      [userName]: [...(conversations[userName] || []), newMessage],
    };
    setConversations(updatedConversations);
  };

  return (
    <ConversationContext.Provider value={{ conversations, sendMessage }}>
      {children}
    </ConversationContext.Provider>
  );
};