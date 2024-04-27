import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledTab = styled(Tab)(({ theme }) => ({
    borderRadius: '20px',
    margin: theme.spacing(0.5),
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
      opacity: 1,
    },
  }));
  
const Navigation = ({ onChangeTab }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChangeTab(newValue); // Pass this new value back to App.js
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
          
        >
          <StyledTab label="All messages" />
          <StyledTab label="Messenger" />
          <StyledTab label="Instagram" />
          <StyledTab label="WhatsApp" />
        </Tabs>
      </Box>
    </AppBar>
  );
};

export default Navigation;