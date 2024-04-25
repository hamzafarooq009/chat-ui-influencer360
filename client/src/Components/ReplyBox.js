import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const ReplyBox = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    onSend(message);
    setMessage(''); // Clear the input after sending
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your reply..."
        variant="outlined"
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <IconButton color="primary" onClick={handleSendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ReplyBox;