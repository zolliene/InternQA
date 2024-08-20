import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import logo from '../image/logo.png';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [favoriteColor, setFavoriteColor] = useState('black'); // State to manage FavoriteIcon color
  const isMobile = useMediaQuery('(max-width:600px)'); // Media query for mobile devices

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFavoriteClick = () => {
    // Toggle between black and blue colors when the icon is clicked
    setFavoriteColor((prevColor) => (prevColor === 'black' ? 'blue' : 'black'));
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
            <Link to="/home-page">
              <MenuItem>
                <HomeIcon 
                sx={{ color: favoriteColor }}
                onClick={handleFavoriteClick}
                />
              </MenuItem>
            </Link>
            <Link to="/your-fav">
              <MenuItem>
                <FavoriteIcon
                  sx={{ color: favoriteColor }}
                  onClick={handleFavoriteClick}
                />
              </MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}><LogoutIcon /></MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
