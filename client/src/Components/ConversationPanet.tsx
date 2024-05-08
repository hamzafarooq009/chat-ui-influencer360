// Import necessary React and Material-UI components
import React, { useState, useEffect, useRef } from "react";
import { Box, Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, IconButton, TextField, Card, CardHeader } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Picker from "emoji-picker-react";

// Import interfaces
import { Message, User } from '../interfaces';

// Define the type for the props expected by ConversationPane
interface ConversationPaneProps {
  conversation: Message[];
  onSendMessage: (message: string) => void;
  selectedUser: User;
  onHeaderClick?: () => void;  // Optional prop for handling header clicks
}

const ConversationPanet: React.FC<ConversationPaneProps> = ({
  conversation,
  onSendMessage,
  selectedUser,
  onHeaderClick,
}) => {
  const [reply, setReply] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [chosenEmoji, setChosenEmoji] = useState<any>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSend = () => {
    if (reply.trim()) {
      onSendMessage(reply);
      setReply("");
    }
    if (selectedFile) {
      console.log("File to send:", selectedFile);
      setSelectedFile(null);
    }
  };

  const onEmojiClick = (emojiObject: any, event: React.MouseEvent) => {
    console.log(emojiObject); // Log the emoji object to see what properties it has
    setReply((prevReply) => prevReply + emojiObject.emoji); // This appends the emoji character
    setShowEmojiPicker(false); // Optionally close the picker after selection
  };  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(90vh - 64px)",
      }}
    >
      {selectedUser && (
        <CardHeader
          avatar={<Avatar aria-label="profile picture" src={selectedUser.profile_picture || ''} />}
          title={selectedUser.username}
          subheader={`@${selectedUser.username}`}
          onClick={onHeaderClick}
          sx={{ cursor: "pointer", p: 2, backgroundColor: "#FCFCFC" }}
        />
      )}

      {/* Additional components and logic remain unchanged */}
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          mb: 2,
          backgroundColor: "#FFFFFF",
        }}
      >
        <List sx={{ paddingBottom: "60px" }}>
          {conversation.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start">
              {msg.from !== "You" && (
                <ListItemAvatar>
                  <Avatar alt={msg.from} src={selectedUser.profile_picture} />
                </ListItemAvatar>
              )}
              <ListItemText
                primary={
                  <Card
                    sx={{
                      p: 2,
                      my: 1,
                      maxWidth: "75%",
                      bgcolor: msg.from === "You" ? "#e0f7fa" : "#f1f3f4", // Adjust the background color to match your design
                      borderRadius: "20px",
                      marginLeft: msg.from === "You" ? "auto" : 0, // Align right if it's "You"
                      position: "relative", // Add position relative for absolute positioning of date
                    }}
                  >
                    <Typography
                      component="span"
                      variant="body1"
                      display="block"
                    >
                      {msg.message}
                    </Typography>
                    {/* Position the date absolutely within the card at the bottom-right */}
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 16,
                        color: "text.secondary",
                      }}
                    >
                      {msg.date}
                    </Typography>
                  </Card>
                }
              />
            </ListItem>
          ))}

          <div ref={messagesEndRef} />
        </List>
      </Paper>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #ccc",
          padding: 2,
        }}
      >
        <TextField
          fullWidth
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your reply..."
          variant="outlined"
          size="small"
          sx={{ mr: 1, borderRadius: "20px" }}
        />

        {showEmojiPicker && (
          <Box
            sx={{
              position: "absolute",
              bottom: "50px", // Adjust according to your layout needs
              left: "55%",
              transform: "translateX(-50%)",
              zIndex: 1000, // Ensure it's above other components
              width: "auto", // or fixed width
              maxHeight: "300px", // Limit height and make it scrollable
              overflowY: "auto",
              backgroundColor: "background.paper", // Use theme colors
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "4px",
              boxShadow: 3,
            }}
          >
            {/* <Picker onEmojiClick={onEmojiClick} /> */}
          </Box>
        )}

        <IconButton
          color="primary"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <EmojiEmotionsIcon />
        </IconButton>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileChange}
        />
        {/* <IconButton
          color="primary"
          onClick={() => fileInputRef.current.click()}
        >
          <AttachmentIcon />
        </IconButton> */}

        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>


    </Box>
  );
};

export default ConversationPanet;