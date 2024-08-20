import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import logo from '../image/logo.png';
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)'); // Media query for mobile devices

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("User logged out");
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: '1px solid #ddd',
        padding: isMobile ? '0 10px' : '0 20px', // Adjust padding for mobile
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Amazing Tech Logo"
            style={{
              height: isMobile ? '30px' : '40px', // Adjust logo size for mobile
              marginRight: '10px',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IconButton
            onClick={handleMenuOpen}
            sx={{ color: 'inherit' }}
          >
            <PersonIcon sx={{ fontSize: isMobile ? 25 : 30 }} /> {/* Adjust icon size */}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: 'visible',
                mt: 1.5,
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
