import React, { useState, useContext } from "react";
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
import MessageList from "./Components/MessageList";
import ConversationPane from "./Components/ConversationPane";
import ProfilePreview from "./Components/ProfilePreview";
// import { ConversationContext } from './Components/ConversationContext';

import { usersData, dummyConversations, users } from "./data";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [conversation, setConversation] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All"); // Keep track of the selected tab
  const [filteredUsers, setFilteredUsers] = useState(usersData); // Initialize with all users
  // Add state to hold the entire conversation including new messages
  const [allConversations, setAllConversations] = useState(dummyConversations);
  const [selectedUserProfile, setSelectedUserProfile] = useState(usersData[0]);


  const tabNames = ["All", "Messenger", "Instagram", "WhatsApp"];

  // const { conversations } = useContext(ConversationContext);

  const handleSelectUser = (name) => {
    setSelectedUserName(name);
    // Find the user profile from usersData
    const userProfile = usersData.find((user) => user.name === name);
    setSelectedUserProfile(userProfile || usersData[0]);
    const userConversation = dummyConversations[name] || [];
    setConversation(userConversation);
    // ...rest of the code
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Here you would normally filter your messages based on the search query
  };
  const handleSelectTab = (tabIndex) => {
    const tab = tabNames[tabIndex];
    setSelectedTab(tab);
    if (tab === "All") {
      setFilteredUsers(usersData);
    } else {
      // Assuming you have a way to determine the platform in usersData or another state that holds this info
      const newFilteredUsers = usersData.filter((user) => user.platform === tab);
      setFilteredUsers(newFilteredUsers);
      // console.log("filteredUsers: ", filteredUsers)
      // console.log("users: ", users)
    }
  };

  const handleSendMessage = (newMessageContent) => {
    const newMessage = {
      from: "You",
      source: "Direct",
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: newMessageContent,
    };
  
    // Copy the existing conversations and add the new message to the selected user's conversation
    setAllConversations(prevConversations => ({
      ...prevConversations,
      [selectedUserName]: [...(prevConversations[selectedUserName] || []), newMessage],
    }));
  
    // Now update the current conversation that is being displayed
    setConversation(prevConversation => [...prevConversation, newMessage]);
  };
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
      <Navigation onChangeTab={handleSelectTab} />
      </AppBar>
      <Toolbar />
      <Grid
        container
        spacing={2}
        sx={{ pt: 8, px: 2, maxWidth: "100%", margin: "0 auto" }}
      >
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}
          >
            <SearchBar onSearch={setSearchQuery} />
            <MessageList
              users={users}
              onSelectUser={handleSelectUser}
              selectedUser={selectedUserName}
              selectedTab={selectedTab} // Pass the selectedTab state to MessageList
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <ConversationPane conversation={conversation} onSendMessage={handleSendMessage}/>
        </Grid>
        <Grid item xs={12} md={3}>
          <ProfilePreview profile={selectedUserProfile} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
