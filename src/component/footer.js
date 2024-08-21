import React from 'react';
import { Box, Typography, IconButton, Grid, useMediaQuery } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        padding: isMobile ? '8px 10px' : '12px 20px',
        borderRadius: '16px 16px 0 0',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          marginTop: '10px',
          borderTop: '1px solid #ffffff',
          paddingTop: isMobile ? '8px' : '12px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              sx={{
                textAlign: isMobile ? 'center' : 'left',
                fontSize: isMobile ? '12px' : '14px',
              }}
            >
              © 2023 Amazing Tech. All Rights Reserved.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'flex-end',
              alignItems: 'center',
            }}
          >
            <IconButton sx={{ color: '#ffffff', padding: '6px' }}>
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ color: '#ffffff', padding: '6px' }}>
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ color: '#ffffff', padding: '6px' }}>
              <TwitterIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '45vh',
      }}
    >
      <Box sx={{ flex: 1 }}>
        {/* Your page content goes here */}
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
