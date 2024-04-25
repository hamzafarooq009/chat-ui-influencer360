import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navigation = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Social Media Dashboard
        </Typography>
      </Toolbar>
      <Tabs value={value} onChange={handleChange} aria-label="navigation tabs">
        <Tab label="All messages" />
        <Tab label="Messenger" />
        <Tab label="Instagram" />
        <Tab label="WhatsApp" />
        <Tab label="Facebook comments" />
        <Tab label="Instagram comments" />
      </Tabs>
    </AppBar>
  );
};

export default Navigation;