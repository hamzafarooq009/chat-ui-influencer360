import React, { useState, useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';


const ConversationPane = ({ conversation, onSendMessage }) => {
  console.log("conversation", conversation)
  const [reply, setReply] = useState('');
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [conversation]);

  const handleSend = () => {
    if (reply.trim()) {
      onSendMessage(reply);
      setReply('');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(90vh - 64px)', // Adjust this if your AppBar height is different
    }}>
      <Paper elevation={3} sx={{
        flexGrow: 1,
        overflowY: 'auto',
        mb: 2,
        backgroundColor: '#FFFFFF',
      }}>
        <Typography variant="h6" sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
          Conversation
        </Typography>
        <List sx={{ paddingBottom: '60px' }}>
          {conversation.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText primary={
                <Card sx={{
                  p: 2,
                  my: 1,
                  maxWidth: '75%',
                  backgroundColor: msg.from === 'You' ? '#e0f7fa' : '#EAEDFA',
                  borderRadius: '20px',
                  marginLeft: msg.from === 'You' ? 'auto' : 0, // Align right if it's "You"
                }}>
                  <Typography component="span" variant="body2" color="text.primary">
                    {msg.from}
                  </Typography>
                  <Typography component="span" variant="caption" color="text.secondary" display="block">
                    {msg.date}
                  </Typography>
                  <Typography component="span" variant="body1" display="block">
                    {msg.content}
                  </Typography>
                </Card>
              } />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>
      <Box sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid #ccc',
      }}>
        <TextField
          fullWidth
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your reply..."
          variant="outlined"
          size="small"
          sx={{ mr: 1, borderRadius: '20px' }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ConversationPane;