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
  Card,
  CardHeader,
  Tooltip,
  Dialog,
  DialogContent,
} from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from "@mui/icons-material/Close";
import { ClickAwayListener } from "@mui/material";
import Picker, { EmojiClickData } from "emoji-picker-react";

// Import interfaces
import { Message, User, AttachmentType, ConversationAttachment } from "../interfaces";
import MessageBox from "./MessageBox";

interface ConversationPanetProps {
  conversation: Message[];
  onSendMessage: (message: string, attachment?: ConversationAttachment) => void;
  selectedUser: User;
  onHeaderClick?: () => void;
  onAddReaction: (messageId: string, emoji: string) => void;
  draftReplies: { [key: string]: string };
  setDraftReplies: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const ConversationPanet: React.FC<ConversationPanetProps> = ({
  conversation,
  onSendMessage,
  selectedUser,
  onHeaderClick,
  onAddReaction,
  draftReplies,
  setDraftReplies,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [emojiPickerSide, setEmojiPickerSide] = useState<'left' | 'right'>('right');
  const [openImage, setOpenImage] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    if (selectedMessageId) {
      onAddReaction(selectedMessageId, emojiData.emoji);
      setShowEmojiPicker(false);
      setSelectedMessageId(null);
    }
  };

  const handleShowEmojiPicker = (event: React.MouseEvent<HTMLButtonElement>, messageId: string, side: 'left' | 'right') => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPickerPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    setSelectedMessageId(messageId);
    setEmojiPickerSide(side);
    setShowEmojiPicker(true);
  };

  const renderAttachment = (attachment: ConversationAttachment) => {
    if (!attachment.payload) {
      return null;
    }

    console.log("Rendering attachment:", attachment);

    const fileExtension = attachment.payload.split('.').pop()?.toLowerCase();

    // Handle image attachments
    if (attachment.type === AttachmentType.MEDIA_SHARE) {
      return (
        <Box
          component="img"
          src={attachment.payload}
          alt="attachment"
          onClick={() => setOpenImage(attachment.payload)}
          sx={{
            maxWidth: '300px',
            maxHeight: '300px',
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor: 'transparent', // Ensure no background color
          }}
        />
      );
    }
    // Handle non-image attachments
    else if (attachment.type === AttachmentType.NON_MEDIA_FILE) {
      const fileName = attachment.payload.split('/').pop() || "file";
      return (
        <a href={attachment.payload} download={fileName} target="_blank" rel="noopener noreferrer">
          <IconButton color="primary">
            <FileDownloadIcon />
            <Typography variant="caption" component="span" ml={1}>
              {fileName}
            </Typography>
          </IconButton>
        </a>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 130px)",
        overflowY: "auto",
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <List sx={{ flexGrow: 1, paddingBottom: "60px", overflowY: "auto" }}>
          {conversation.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start" sx={{ position: "relative" }}>
              {msg.from !== "You" && (
                <ListItemAvatar>
                  <Avatar alt={msg.from} src={selectedUser.profile_picture} />
                </ListItemAvatar>
              )}
              <ListItemText
                primary={
                  <Tooltip
                    title={new Date(msg.date).toLocaleString()}
                    arrow
                    placement={msg.from === "You" ? "top-end" : "top-start"}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: msg.from === "You" ? "flex-end" : "flex-start",
                      }}
                    >
                      <Card
                        sx={{
                          p: 2,
                          my: 1,
                          maxWidth: "75%",
                          bgcolor: (msg.from === "You" && msg.attachment.type === AttachmentType.NONE) ? "#A020F0" : "transparent",
                          color: msg.from === "You" ? "#ffffff" : "#000000",
                          borderRadius: "20px",
                          marginLeft: msg.from === "You" ? "auto" : 0,
                        }}
                      >
                        <Typography
                          component="span"
                          variant="body1"
                          display="block"
                          sx={{
                            fontSize: "14px",
                            fontWeight: "normal",
                            color: msg.attachment.type === AttachmentType.NONE ? "FFFFFF" : "#000000",
                          }}
                        >
                          {msg.message}
                        </Typography>

                        {msg.attachment && msg.attachment.type !== null && renderAttachment(msg.attachment)}
                      </Card>

                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: msg.from === "You" ? "auto" : 0,
                          right: msg.from === "You" ? 0 : "auto",
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                          px: 3,
                          width: "100%",
                          justifyContent: msg.from === "You" ? "flex-end" : "flex-start",
                        }}
                      >
                        {msg.reactions.map((reaction, idx) => (
                          <Typography
                            key={idx}
                            component="span"
                            variant="body2"
                            sx={{
                              border: "1px solid white",
                              borderRadius: "2px",
                              padding: "2px 4px",
                              backgroundColor: "rgba(255, 255, 255, 0.1)", // optional background color for better visibility
                              mr: 1,
                              bgcolor: "white"
                            }}
                          >
                            {reaction.reaction} {reaction.user.length}
                          </Typography>
                        ))}
                      </Box>

                      <IconButton
                        className="hover-visible"
                        color="primary"
                        onClick={(e) => handleShowEmojiPicker(e, msg.id, msg.from === "You" ? 'left' : 'right')}
                        sx={{
                          marginLeft: 1,
                          visibility: "hidden",
                          "&:hover": {
                            visibility: "visible",
                          },
                          "&.hover-visible": {
                            visibility: "visible",
                          },
                        }}
                      >
                        <EmojiEmotionsIcon />
                      </IconButton>
                    </Box>
                  </Tooltip>
                }
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>

        <MessageBox
          onSendMessage={onSendMessage}
          draftReplies={draftReplies}
          setDraftReplies={setDraftReplies}
          selectedUser={selectedUser}
        /> {/* Fixed MessageBox at the bottom */}
      </Paper>

      {showEmojiPicker && (
      <ClickAwayListener onClickAway={() => setShowEmojiPicker(false)}>
        <Box
          sx={{
            position: "absolute",
            top: pickerPosition.top,
            left: emojiPickerSide === 'right' ? pickerPosition.left : pickerPosition.left - 250,
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
          <Picker onEmojiClick={handleEmojiClick} />
        </Box>
      </ClickAwayListener>
    )}
    

      <Dialog open={Boolean(openImage)} onClose={() => setOpenImage(null)} maxWidth="md" fullWidth>
        <DialogContent>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpenImage(null)}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={openImage || ''}
            alt="attachment"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ConversationPanet;