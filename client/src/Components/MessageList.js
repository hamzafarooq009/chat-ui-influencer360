import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import MessageIcon from '@mui/icons-material/Message';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const MessageList = ({ users, onSelectUser, selectedUser, selectedTab }) => {
    // Function to get the icon based on the platform
    const getPlatformIcon = (platform) => {
        switch(platform) {
            case 'Instagram': return <InstagramIcon />;
            case 'Messenger': return <MessageIcon />;
            case 'WhatsApp': return <WhatsAppIcon />;
            default: return null;
        }
    };

    // Filter the users based on the selectedTab, if it's not "All"
  const filteredUsers = selectedTab === "All"
  ? users
  : users.filter(user => user.platform === selectedTab);


    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {filteredUsers.map((user) => (
                <ListItem
                    key={user.username} // Use username as a unique key
                    alignItems="flex-start"
                    button
                    selected={selectedUser === user.name} // Compare with username
                    onClick={() => onSelectUser(user.name)} // Pass username
                >
                    <ListItemAvatar>
                        <Avatar alt={user.name} src={user.image} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.name}
                        secondary={
                            <>
                                
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {/* {user.lastMessageSource} */}
                                    {getPlatformIcon(user.lastMessageSource)}
                                    {user.lastMessage}
                                </Typography>
                                {" — " + user.lastMessageDate}
                            </>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default MessageList;