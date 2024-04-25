import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const MessageList = ({ users, onSelectUser, selectedUser }) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {users.map((user, index) => (
                <ListItem
                    key={user.name} // Ideally, use a unique identifier like user.id
                    alignItems="flex-start"
                    button
                    selected={selectedUser === user.name}
                    onClick={() => onSelectUser(user.name)}
                >
                    <ListItemAvatar>
                        <Avatar alt={user.name} src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.name}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {user.lastMessage}
                                </Typography>
                                {" — " + user.lastMessageDate}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default MessageList;