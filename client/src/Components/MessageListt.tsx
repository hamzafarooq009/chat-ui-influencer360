import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import InstagramIcon from "@mui/icons-material/Instagram";
import MessageIcon from "@mui/icons-material/Message";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { User, Platform } from "../interfaces"; // Ensure correct path

interface MessageListProps {
  users: User[];
  onSelectUser: (username: string) => void;
  selectedUser: string;
  selectedTab: Platform | "All";
}

const MessageListt: React.FC<MessageListProps> = ({
  users,
  onSelectUser,
  selectedUser,
  selectedTab,
}) => {
  // Function to get the icon based on the platform
  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case Platform.INSTAGRAM:
        return <InstagramIcon />;
      case Platform.MESSENGER:
        return <MessageIcon />;
      case Platform.WHATSAPP:
        return <WhatsAppIcon />;
      default:
        return null;
    }
  };

  // Filter the users based on the selectedTab, if it's not "All"
  const filteredUsers =
    selectedTab === "All"
      ? users
      : users.filter((user) => user.platform === selectedTab);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {filteredUsers.map((user) => (
        <ListItem
          key={user.username} // Use username as a unique key
          alignItems="flex-start"
          button
          selected={selectedUser === user.username} // Compare with username
          onClick={() => onSelectUser(user.username)} // Pass username
        >
          <ListItemAvatar>
            <Avatar alt={user.username} src={user.profile_picture} />
          </ListItemAvatar>
          <ListItemText
            primary={user.username}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {getPlatformIcon(user.platform)}
                  {user.lastMessage
                    ? `${user.lastMessage} - ${user.lastMessageDate}`
                    : "No recent messages"}
                </Typography>
                {/* Additional secondary text if needed */}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default MessageListt;
