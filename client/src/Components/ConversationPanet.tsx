// Import necessary React and Material-UI components
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  TextField,
  Card,
  CardHeader,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Picker, { EmojiClickData } from "emoji-picker-react";

// Import interfaces
import { Message, User } from "../interfaces";

interface ConversationPaneProps {
  conversation: Message[];
  onSendMessage: (message: string) => void;
  selectedUser: User;
  onHeaderClick?: () => void; // Optional prop for handling header clicks
}

const ConversationPanet: React.FC<ConversationPaneProps> = ({
  conversation,
  onSendMessage,
  selectedUser,
  onHeaderClick,
}) => {
  const [reply, setReply] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // const [chosenEmoji, setChosenEmoji] = useState<any>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setReply((prevReply) => prevReply + emojiData.emoji); // Append the selected emoji to the reply
    setShowEmojiPicker(false); // Optionally close the picker after selection
  };

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
      // Implement or call a function to handle file upload here
      // e.g., uploadFile(selectedFile);
      setSelectedFile(null);
    }
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
          avatar={
            <Avatar
              aria-label="profile picture"
              src={selectedUser.profile_picture || ""}
            />
          }
          title={selectedUser.username}
          subheader={`@${selectedUser.username}`}
          onClick={onHeaderClick}
          sx={{ cursor: "pointer", p: 2, backgroundColor: "#FCFCFC" }}
        />
      )}

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
                      bgcolor: msg.from === "You" ? "#e0f7fa" : "#f1f3f4",
                      borderRadius: "20px",
                      marginLeft: msg.from === "You" ? "auto" : 0,
                      position: "relative",
                    }}
                  >
                    <Typography
                      component="span"
                      variant="body1"
                      display="block"
                    >
                      {msg.message}
                    </Typography>
                    
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
              bottom: "50px",
              left: "55%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              width: "auto",
              maxHeight: "300px",
              overflowY: "auto",
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "4px",
              boxShadow: 3,
            }}
          >
            {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
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

        <IconButton
          color="primary"
          onClick={() => fileInputRef.current?.click()}
        >
          <AttachmentIcon />
        </IconButton>

        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ConversationPanet;
