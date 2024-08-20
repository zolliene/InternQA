import React from 'react';
import { Box, Typography, IconButton, Grid, useMediaQuery } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const isMobile = useMediaQuery('(max-width:600px)'); // Media query for mobile devices

  return (
    <Box
      sx={{
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        padding: isMobile ? '10px 10px' : '20px 20px', // Adjust padding for mobile
        borderRadius: '16px 16px 0 0',
      }}
    >
      <Grid container spacing={1}>
        {/* Add any additional content here */}
      </Grid>
      <Box
        sx={{
          marginTop: '20px',
          borderTop: '1px solid #ffffff',
          paddingTop: isMobile ? '10px' : '20px', // Adjust padding for mobile
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              © 2023 Amazing Tech. All Rights Reserved.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'flex-end', // Center icons on mobile
              alignItems: 'center',
            }}
          >
            <IconButton sx={{ color: '#ffffff' }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton sx={{ color: '#ffffff' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: '#ffffff' }}>
              <TwitterIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
