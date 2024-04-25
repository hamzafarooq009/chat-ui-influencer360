import React, {useState} from "react"
import { ThemeProvider, Paper, CssBaseline, Grid, AppBar, Toolbar, Box } from '@mui/material';
import theme from './theme';

import SearchBar from './Components/SearchBar';
import Navigation from './Components/Navigation';
import MessageList from './Components/MessageList';
import ConversationPane from './Components/ConversationPane';
import ProfilePreview from './Components/ProfilePreview';



const userProfile = {
  name: 'Jane Doe',
  username: 'janedoe',
  image: '/path/to/profile-pic.jpg',
  coverImage: '/path/to/cover-image.jpg',
  bio: 'Life explorer. Music lover. Foodie. Traveler.'
};

// Dummy messages data
const dummyMessages = [
  { senderName: 'John Doe', senderImage: '/path/to/image.jpg', text: 'Hello, how are you?', date: 'Apr 25' },
  { senderName: 'Hamza Farooq', senderImage: '/path/to/image.jpg', text: 'Hello, how are you?', date: 'Apr 25' },
  { senderName: 'Hamza Farooq', senderImage: '/path/to/image.jpg', text: 'Hello, how are you?', date: 'Apr 25' },
  { senderName: 'Hamza Farooq', senderImage: '/path/to/image.jpg', text: 'Hello, how are you?', date: 'Apr 25' },
  { senderName: 'Hamza Farooq', senderImage: '/path/to/image.jpg', text: 'Hello, how are you?', date: 'Apr 25' },
  { senderName: 'Hamza Farooq', senderImage: '/path/to/image.jpg', text: 'Hello, how are you?', date: 'Apr 25' },
  { senderName: 'Hamza Farooq', senderImage: '/path/to/image.jpg', text: 'Hello, how are you?', date: 'Apr 25' },
  { senderName: 'Hamza Farooq', senderImage: '/path/to/image.jpg', text: 'Hello, how are you?', date: 'Apr 25' },
  { senderName: 'Hamza Farooq', senderImage: '/path/to/image.jpg', text: 'Hello, how are you?', date: 'Apr 25' },
  { senderName: 'Hamza Farooq', senderImage: '/path/to/image.jpg', text: 'Hello, how are you?', date: 'Apr 25' },
  { senderName: 'Hamza Farooq', senderImage: '/path/to/image.jpg', text: 'Hello, how are you?', date: 'Apr 25' },
  // ... more messages
];

const dummyConversations = {
  "John Doe": [
    { from: 'John Doe', date: '10:30 AM', content: 'Hello, how are you?' },
    { from: 'You', date: '10:32 AM', content: 'I am fine, thanks! How about you?' },
    // ... more messages
  ],
  "Hamza Farooq": [
    { from: 'Hamza Farooq', date: '11:00 AM', content: 'Hey! Are we still on for today?' },
    { from: 'You', date: '11:05 AM', content: 'Yes, see you in the evening.' },
    // ... more messages
  ],
  // ... conversations for other users
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState([]);



  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    // Assuming dummyConversation is an object with user names as keys and arrays of message objects as values.
    const userMessages = dummyConversations[message.senderName];
    if (Array.isArray(userMessages)) {
      setConversation(userMessages);
    } else {
      // If it's not an array, log an error or handle appropriately
      console.error('User messages are not in an array format:', userMessages);
      setConversation([]); // Reset to an empty array to avoid crashing
    }
  };
  

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Here you would normally filter your messages based on the search query
  };
    // When a user clicks on a user/message in the MessageList
  const handleSelectUser = (userName) => {
    setSelectedUser(userName);
    setConversation(dummyConversations[userName] || []);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Navigation />
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Spacer for AppBar */}
      <Grid container spacing={2} sx={{ pt: 8, px: 2, maxWidth: '100%', margin: '0 auto' }}>
        {/* Users Section */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            <SearchBar onSearch={handleSearch} />
            <MessageList 
              users={Object.keys(dummyConversations)} 
              onSelectUser={handleSelectUser} 
              selectedUser={selectedUser}
            />
          </Paper>
        </Grid>
        {/* Conversation Section */}
        <Grid item xs={12} md={6}>
        <ConversationPane conversation={conversation} />
        </Grid>
        {/* Profile Section */}
        <Grid item xs={12} md={3}>
          <ProfilePreview profile={userProfile} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;