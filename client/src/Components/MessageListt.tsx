import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import MessageIcon from '@mui/icons-material/Message';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { User, Platform } from '../interfaces'; // Ensure correct path
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface MessageListProps {
  users: User[];
  onSelectUser: (username: string) => void;
  selectedUser: string;
  selectedTab: Platform | 'All';
}

const MessageListt: React.FC<MessageListProps> = ({
  users,
  onSelectUser,
  selectedUser,
  selectedTab,
}) => {
  const [page, setPage] = useState<number>(1);
  const [paginatedUsers, setPaginatedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const USERS_PER_PAGE = 10;

  useEffect(() => {
    loadMoreUsers();
  }, [page, selectedTab]);

  useEffect(() => {
    setPage(1);
    setPaginatedUsers(users.slice(0, USERS_PER_PAGE));
  }, [users]);

  const loadMoreUsers = () => {
    setLoading(true);
    setTimeout(() => {
      const newUsers = users.slice(0, page * USERS_PER_PAGE);
      setPaginatedUsers(newUsers);
      setLoading(false);
    }, 500); // Simulate network delay
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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

  const truncateMessage = (message: string, maxLength: number) => {
    if (message.length > maxLength) {
      return message.substring(0, maxLength) + '...';
    }
    return message;
  };

  
  useEffect(() => {
    console.log('paginatedUsers Users:', paginatedUsers);
  }, [paginatedUsers]);

  return (
    <Box
      sx={{
        height: 'calc(100vh - 200px)', // Adjust the height to account for the message box
        overflowY: 'auto',
      }}
      onScroll={handleScroll}
    >
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {paginatedUsers.map((user) => (
          <ListItem
            key={user.username}
            alignItems="flex-start"
            button
            selected={selectedUser === user.username}
            onClick={() => onSelectUser(user.username)}
          >
            <ListItemAvatar>
              <Avatar alt={user.username} src={user.profile_picture} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    noWrap
                    style={{ fontWeight: 'bold' }}
                  >
                    {user.username}
                  </Typography>
                  {getPlatformIcon(user.platform)}
                </Box>
              }
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {truncateMessage(user.lastMessage || 'No recent messages', 30)}
                  </Typography>
                  <Typography
                    sx={{ display: 'inline', float: 'right' }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {user.lastMessageDate}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        )}
      </List>
    </Box>
  );
};

export default MessageListt;