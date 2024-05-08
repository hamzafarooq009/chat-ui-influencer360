import React, { useState } from "react";
import {
  ThemeProvider,
  Paper,
  CssBaseline,
  Grid,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import theme from "./theme";

import SearchBar from "./Components/SearchBar";
import Navigation from "./Components/Navigation";
import MessageListt from "./Components/MessageListt";
import ConversationPanet from "./Components/ConversationPanet";
import ProfilePreviewt from "./Components/ProfilePreviewt";

import { usersData, dummyConversations, users } from "./data";
import { User, Message, Platform, AttachmentType } from './interfaces'; // Import your interfaces

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(usersData);
  const [allConversations, setAllConversations] = useState<typeof dummyConversations>(dummyConversations);
  const [selectedUserProfile, setSelectedUserProfile] = useState<User>(usersData[0]);
  const [isProfilePreviewOpen, setIsProfilePreviewOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>(usersData[0]);

  const [selectedTab, setSelectedTab] = useState<Platform | 'All'>('All');


  const tabNames: (Platform | 'All')[] = ["All", Platform.MESSENGER, Platform.INSTAGRAM, Platform.WHATSAPP]

  const toggleProfilePreview = (): void => {
    setIsProfilePreviewOpen(!isProfilePreviewOpen);
  };

  
  const handleSelectUser = (username: string): void => {
    const userProfile = usersData.find((user) => user.username === username);
    setSelectedUser(userProfile || usersData[0]);
    const userConversation = dummyConversations[username] || [];
    setConversation(userConversation);
    setSelectedUserProfile(userProfile || usersData[0]);  // Ensure this is also being updated
  };
  

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  const handleSelectTab = (tabIndex: number): void => {
    const tab = tabNames[tabIndex];
    setSelectedTab(tab);
    if (tab === "All") {
        setFilteredUsers(usersData);
    } else {
        const newFilteredUsers = usersData.filter((user) => user.platform === tab);
        setFilteredUsers(newFilteredUsers);
    }
};

  const getPlatformEnum = (tabName: string): Platform | undefined => {
    const mapping: { [key: string]: Platform } = {
        'Instagram': Platform.INSTAGRAM,
        'Messenger': Platform.MESSENGER,
        'WhatsApp': Platform.WHATSAPP
    };
    return mapping[tabName];
};


  const handleSendMessage = (newMessageContent: string): void => {
    if (!selectedUser) {
      // Optionally, set to first user as a fallback (though should be initially set)
      setSelectedUser(usersData[0]);
      return; // Add error handling or logging here if needed
    }

    const newMessage: Message = {
      from: "You",  
      message: newMessageContent,
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString(),
      attachment: { type: AttachmentType.NONE, payload: null },
      receipient: selectedUser,
      reactions: [],
      createTime: Date.now(),
      source: "Direct",
  };

    setAllConversations((prevConversations) => ({
      ...prevConversations,
      [selectedUserName]: [...(prevConversations[selectedUserName] || []), newMessage],
    }));

    setConversation((prevConversation) => [...prevConversation, newMessage]);
  };

  return (
<ThemeProvider theme={theme}>
  <CssBaseline />
  <Box>
    <AppBar position="fixed">
      <Navigation onChangeTab={handleSelectTab} />
    </AppBar>
    <Toolbar />
    <Grid container spacing={2} sx={{ pt: 8, px: 2, maxWidth: "100%", margin: "0 auto" }}>
      <Grid item xs={12} md={3}>
        <Paper elevation={3} sx={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}>
          <SearchBar onSearch={setSearchQuery} />
          <MessageListt
            users={users}
            onSelectUser={handleSelectUser}
            selectedUser={selectedUserName}
            selectedTab={selectedTab}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ConversationPanet
          conversation={conversation}
          onSendMessage={handleSendMessage}
          selectedUser={selectedUserProfile}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <ProfilePreviewt profile={selectedUserProfile} />
      </Grid>
    </Grid>
  </Box>
</ThemeProvider>
  );
}

export default App;