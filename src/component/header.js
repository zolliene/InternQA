import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton } from '@mui/material';
import logo from '../image/logo.png';

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #ddd' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Amazing Tech Logo" style={{ height: '40px', marginRight: '10px' }} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Typography variant="body1" component="a" href="/about-us" sx={{ textDecoration: 'none', color: 'inherit' }}>
            About Us
          </Typography>
          <Typography variant="body1" component="a" href="/services" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Services
          </Typography>
          <Typography variant="body1" component="a" href="/use-cases" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Use Cases
          </Typography>
          <Typography variant="body1" component="a" href="/blog" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Blog
          </Typography>
        </Box>

        {/* Right Section: User Icon and Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar sx={{ backgroundColor: '#6e8efb' }}>
            <img src="/path-to-your-icon/user-icon.png" alt="User Icon" style={{ width: '100%' }} />
          </Avatar>
          <Avatar alt="User Avatar" src="/path-to-your-avatar/avatar.png" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
