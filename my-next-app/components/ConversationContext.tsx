// ConversationContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Message } from '../app/interfaces';

// Define the type for the conversations state
interface Conversations {
  [key: string]: Message[];
}

// Define the type for the context value
interface ConversationContextType {
  conversations: Conversations;
  sendMessage: (userName: string, newMessage: Message) => void;
}

// Create the ConversationContext with a default value
export const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

// Define the type for the ConversationProvider props
interface ConversationProviderProps {
  children: ReactNode;
}

export const ConversationProvider: React.FC<ConversationProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversations>({});

  const sendMessage = (userName: string, newMessage: Message) => {
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