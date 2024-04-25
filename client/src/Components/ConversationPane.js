import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ReplyBox from './ReplyBox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const ConversationPane = ({ conversation, onSendMessage }) => {
    const [editingMessage, setEditingMessage] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState(null);

    // Inside your ConversationPane component
if (!Array.isArray(conversation)) {
  // Handle case where conversation is not an array
  console.error('Expected conversation to be an array, received:', conversation);
  return null; // Or a placeholder indicating no messages
}
    const handleEditMessage = (message) => {
        // Set the message to be edited
        setEditingMessage(message);
      };
    
      const handleDeleteMessage = (message) => {
        // Ask for confirmation before deleting
        setMessageToDelete(message);
        setDeleteConfirmationOpen(true);
      };
    
      const confirmDelete = () => {
        console.log('Delete message:', messageToDelete);
        // Here you would handle the deletion of the message
        setDeleteConfirmationOpen(false);
      };

    const handleSend = (content) => {
        // This is where you would add the logic to send a message.
        // For now, let's just log it to the console.
        console.log('Message to send:', content);
        onSendMessage(content);
      };
    
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Paper elevation={3} sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Conversation
        </Typography>
        <List sx={{ paddingBottom: '60px' }}> {/* Additional space for the sticky reply box */}
          {conversation.map((msg, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={msg.from}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {msg.date}
                      </Typography>
                      {/* 'display: block' creates a new line for the message content */}
                      <Typography component="span" variant="body1" display="block">
                        {msg.content}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < conversation.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Box sx={{ position: 'sticky', bottom: 0, zIndex: 1, backgroundColor: 'background.paper' }}>
        <ReplyBox onSend={onSendMessage} />
      </Box>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>    
  );
};

export default ConversationPane;