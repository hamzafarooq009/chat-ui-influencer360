import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Picker, { EmojiClickData } from "emoji-picker-react";
import { AttachmentType, ConversationAttachment, User } from "../app/interfaces";
import { ClickAwayListener } from "@mui/material";

interface MessageBoxProps {
  onSendMessage: (message: string, attachment?: ConversationAttachment) => void;
  draftReplies: { [key: string]: string };
  setDraftReplies: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  selectedUser: User;                        
}

const MessageBox: React.FC<MessageBoxProps> = ({ onSendMessage, draftReplies, setDraftReplies, selectedUser }) => {
  const [reply, setReply] = useState<string>(draftReplies[selectedUser.username] || "");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setReply(draftReplies[selectedUser.username] || "");
  }, [selectedUser, draftReplies]);

  const handleReplyChange = (newReply: string) => {
    setReply(newReply);
    setDraftReplies((prevDrafts) => ({
      ...prevDrafts,
      [selectedUser.username]: newReply,
    }));
  };

  const handleSend = () => {
    if (reply.trim() || selectedFile) {
      const fileExtension = selectedFile?.name.split('.').pop()?.toLowerCase();
      const isImage = ["jpg", "jpeg", "png", "svg"].includes(fileExtension || "");

      const attachment: ConversationAttachment | undefined = selectedFile
        ? {
          type: isImage ? AttachmentType.MEDIA_SHARE : AttachmentType.NON_MEDIA_FILE,
          payload: URL.createObjectURL(selectedFile),
        }
        : undefined;

      onSendMessage(reply, attachment);
      setReply("");
      setSelectedFile(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const isValidSize = file.size <= 25 * 1024 * 1024;

      if (isValidSize) {
        setSelectedFile(file);
      } else {
        alert("File size should be less than or equal to 25 MB.");
      }
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    handleReplyChange(reply + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderTop: "1px solid #ccc",
        padding: 2,
      }}
    >
      {selectedFile && (
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", background: "none" }}>
          <Typography variant="body1" component="div">
            {selectedFile.name}
          </Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          value={reply}
          onChange={(e) => handleReplyChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your reply..."
          variant="outlined"
          size="small"
          sx={{ mr: 1, borderRadius: "20px" }}
        />

        {showEmojiPicker && (
          <ClickAwayListener onClickAway={() => setShowEmojiPicker(false)}>
            <Box
              sx={{
                position: "absolute",
                bottom: "50px",
                left: "85%",
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
              <Picker onEmojiClick={onEmojiClick} />
            </Box>
          </ClickAwayListener>
        )}

        <IconButton color="primary" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <EmojiEmotionsIcon />
        </IconButton>
        <input ref={fileInputRef} type="file" hidden onChange={handleFileChange} />

        <IconButton color="primary" onClick={() => fileInputRef.current?.click()}>
          <AttachmentIcon />
        </IconButton>

        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MessageBox;