import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Navigation = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
          Social Media Dashboard
        </Typography>
      </Toolbar>
      <Box sx={{ flexGrow: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="navigation tabs"
          textColor="primary"
          indicatorColor="primary"
          sx={{ '.MuiTabs-indicator': { backgroundColor: '#635ee7' } }}
        >
          <Tab label={<StyledBadge>All messages</StyledBadge>} />
          <Tab label={<StyledBadge>Messenger</StyledBadge>} />
          <Tab label="Instagram" />
          <Tab label={<StyledBadge>WhatsApp</StyledBadge>} />
          <Tab label="Facebook comments" />
          <Tab label={<StyledBadge>Instagram comments</StyledBadge>} />
        </Tabs>
      </Box>
    </AppBar>
  );
};

export default Navigation;