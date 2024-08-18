import React from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, Stack } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Navbar({ darkMode, handleDarkModeToggle }) {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{
      borderRadius: '8px',
      border: '1px solid #ddd',
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', width: '85%', margin: '0 auto' }}>
        <Box>
          <IconButton onClick={handleDarkModeToggle} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Typography variant="h6" sx={{ textAlign: 'center', fontWeight:'bold' }}>
          <Stack direction="row">
            Accessi
            <Typography variant="h6" sx={{color:'blue',fontWeight:'bold' }}>Travel</Typography>
          </Stack>
        </Typography>
        <Box>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;