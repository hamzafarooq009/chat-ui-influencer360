import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  Paper,
  CssBaseline,
  Grid,
  AppBar,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";
import theme from "./theme";

import SearchBar from "./Components/SearchBar";
import Navigation from "./Components/Navigation";
import MessageListt from "./Components/MessageListt";
import ConversationPanet from "./Components/ConversationPanet";
import ProfilePreviewt from "./Components/ProfilePreviewt";

import { users, dummyConversations } from "./data";
import { User, Message, Platform, AttachmentType, ConversationAttachment } from "./interfaces";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [allConversations, setAllConversations] = useState<typeof dummyConversations>(dummyConversations);
  const [selectedTab, setSelectedTab] = useState<Platform | 'All'>('All');
  const [isProfilePreviewOpen, setIsProfilePreviewOpen] = useState<boolean>(false);
  const [draftReplies, setDraftReplies] = useState<{ [key: string]: string }>({});
  const [readConversations, setReadConversations] = useState<Set<string>>(new Set());

  const tabNames: (Platform | 'All')[] = ["All", Platform.MESSENGER, Platform.INSTAGRAM, Platform.WHATSAPP];

  useEffect(() => {
    if (selectedUser) {
      const userConversation = allConversations[selectedUser.username] || [];
      setConversation(userConversation);
      console.log('Selected User:', selectedUser.username, 'Conversation:', userConversation);

      // Mark the conversation as read
      setReadConversations(prevReadConversations => {
        const updatedReadConversations = new Set(prevReadConversations);
        updatedReadConversations.add(selectedUser.username);
        return updatedReadConversations;
      });
    }
  }, [selectedUser, allConversations]);

  useEffect(() => {
    if (filteredUsers.length > 0) {
      setSelectedUser(filteredUsers[0]);
    }
  }, [filteredUsers]);

  useEffect(() => {
    handleSelectTab(tabNames.indexOf(selectedTab));
  }, [searchQuery]);

  const handleSelectUser = (username: string): void => {
    const userProfile = users.find((user) => user.username === username);
    setSelectedUser(userProfile || null);
  };

  const handleSelectTab = (tabIndex: number, query: string = searchQuery): void => {
    const tab = tabNames[tabIndex];
    setSelectedTab(tab);
    if (tab === "All") {
      setFilteredUsers(users.filter(user => user.username.toLowerCase().includes(query.toLowerCase())));
    } else {
      const newFilteredUsers = users.filter((user) => user.platform === tab && user.username.toLowerCase().includes(query.toLowerCase()));
      setFilteredUsers(newFilteredUsers);
    }
  };

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    handleSelectTab(tabNames.indexOf(selectedTab), query);
  };

  const handleSendMessage = (message: string, attachment?: ConversationAttachment): void => {
    if (!selectedUser) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      message: message,
      from: "You",
      source: "Direct",
      date: new Date().toISOString(),
      attachment: attachment || { type: AttachmentType.NONE, payload: null },
      receipient: selectedUser,
      reactions: [],
      createTime: Date.now(),
    };

    console.log("New message:", newMessage);

    setAllConversations((prevConversations) => ({
      ...prevConversations,
      [selectedUser.username]: [...(prevConversations[selectedUser.username] || []), newMessage],
    }));

    setConversation((prevConversation) => [...prevConversation, newMessage]);

    // Clear the draft reply for the current user after sending the message
    setDraftReplies((prevDrafts) => ({
      ...prevDrafts,
      [selectedUser.username]: "",
    }));
  };

  const toggleProfilePreview = () => {
    console.log('Profile preview toggled');
    setIsProfilePreviewOpen(!isProfilePreviewOpen);
  };

  const handleAddReaction = (messageId: string, emoji: string): void => {
    setAllConversations((prevConversations) => {
      const newConversations = { ...prevConversations };
      const userMessages = newConversations[selectedUser!.username].map((msg) => {
        if (msg.id === messageId) {
          const reactionIndex = msg.reactions.findIndex(
            (reaction) => reaction.reaction === emoji
          );
          if (reactionIndex > -1) {
            msg.reactions[reactionIndex].user.push(selectedUser!);
          } else {
            msg.reactions.push({ reaction: emoji, user: [selectedUser!] });
          }
        }
        return msg;
      });
      newConversations[selectedUser!.username] = userMessages;
      return newConversations;
    });

    setConversation((prevConversation) =>
      prevConversation.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: msg.reactions.some((reaction) => reaction.reaction === emoji)
                ? msg.reactions.map((reaction) =>
                    reaction.reaction === emoji
                      ? { ...reaction, user: [...reaction.user, selectedUser!] }
                      : reaction
                  )
                : [...msg.reactions, { reaction: emoji, user: [selectedUser!] }],
            }
          : msg
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: 'linear-gradient(135deg, #e3f2fd 30%, #ffebee 90%)',
          minHeight: '20vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
              Inbox
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Grid container spacing={2} sx={{ pt: 8, px: 2, maxWidth: "100%", margin: "0 auto", flexGrow: 1 }}>
          <Grid item xs={12} md={12}>
            <Navigation onChangeTab={handleSelectTab} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ maxHeight: "calc(100vh - 140px)", overflowY: "auto" }}>
              <SearchBar onSearch={handleSearch} />
              <MessageListt
                users={filteredUsers}
                onSelectUser={handleSelectUser}
                selectedUser={selectedUser ? selectedUser.username : ""}
                selectedTab={selectedTab}
                readConversations={readConversations}
              />
            </Paper>
          </Grid>
          <Grid item xs={10} md={isProfilePreviewOpen ? 6 : 9}>
            <ConversationPanet
              conversation={conversation}
              onSendMessage={handleSendMessage}
              selectedUser={selectedUser || users[0]}
              onHeaderClick={toggleProfilePreview}
              onAddReaction={handleAddReaction}
              draftReplies={draftReplies}
              setDraftReplies={setDraftReplies}
            />
          </Grid>
          {isProfilePreviewOpen && selectedUser && (
            <Grid item xs={12} md={3}>
              <Paper elevation={3} sx={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}>
                <ProfilePreviewt profile={selectedUser} />
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;