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
import CommentIcon from '@mui/icons-material/Comment';

const MessageList = ({ users, onSelectUser, selectedUser }) => {
    // Function to get the icon based on the platform
    const getPlatformIcon = (platform) => {
        switch(platform) {
            case 'Instagram': return <InstagramIcon />;
            case 'Messenger': return <MessageIcon />;
            case 'WhatsApp': return <WhatsAppIcon />;
            case 'Facebook': return <CommentIcon />;
            default: return null;
        }
    };

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {users.map((user) => (
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
