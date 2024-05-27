import React, { useState, useEffect } from 'react';
import { List, Badge } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import MessageIcon from '@mui/icons-material/Message';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { User, Platform } from '../interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface MessageListProps {
  users: User[];
  onSelectUser: (username: string) => void;
  selectedUser: string;
  selectedTab: Platform | 'All';
  readConversations: Set<string>;
}

const StyledAvatar = styled(Avatar)({
  position: 'relative',
});

const IconOverlay = styled('div')({
  position: 'absolute',
  bottom: 0,
  right: 0,
  borderRadius: '50%',
  backgroundColor: 'white',
  padding: '2px',
  transform: 'translate(20%, 20%)',
});

const MessageListt: React.FC<MessageListProps> = ({
  users,
  onSelectUser,
  selectedUser,
  selectedTab,
  readConversations,
}) => {
  const [page, setPage] = useState<number>(1);
  const [paginatedUsers, setPaginatedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const USERS_PER_PAGE = 14;

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
        return <InstagramIcon style={{ color: '#E1306C' }} />;
      case Platform.MESSENGER:
        return <MessageIcon style={{ color: '#0078FF' }} />;
      case Platform.WHATSAPP:
        return <WhatsAppIcon style={{ color: '#25D366' }} />;
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' } as const;
    return date.toLocaleDateString('en-US', options);
  };

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
            sx={{
              bgcolor: selectedUser === user.username ? '#f1f3f4' : 'transparent',
              '&:hover': {
                bgcolor: '#f1f3f4',
              },
            }}
          >
            <ListItemAvatar>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={getPlatformIcon(user.platform)}
              >
                <StyledAvatar alt={user.username} src={user.profile_picture} />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                    noWrap
                    style={{
                      fontWeight: readConversations.has(user.username) ? 'normal' : 'bold',
                      fontSize: '14px',
                    }}
                  >
                    {user.username}
                  </Typography>
                </Box>
              }
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    style={{
                      fontWeight: readConversations.has(user.username) ? 'normal' : 'bold',
                      fontSize: '12px',
                    }}
                  >
                    {truncateMessage(user.lastMessage || 'No recent messages', 30)}
                  </Typography>
                </>
              }
            />
            <Typography
              sx={{ display: 'inline', float: 'right', marginLeft: 'auto' }}
              component="span"
              variant="body2"
              color="text.secondary"
              style={{ fontSize: '12px' }}
            >
              {formatDate(user.lastMessageDate || '')}
            </Typography>
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