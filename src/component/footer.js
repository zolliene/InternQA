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
        padding: isMobile ? '8px 10px' : '12px 20px', // Smaller padding for a more compact footer
        borderRadius: '16px 16px 0 0',
        width: '100%', // Full width across the viewport
        marginTop: 'auto', // Push the footer to the bottom of the container
        boxSizing: 'border-box', // Ensure padding is included in the width
      }}
    >
      <Box
        sx={{
          marginTop: '10px',
          borderTop: '1px solid #ffffff',
          paddingTop: isMobile ? '8px' : '12px', // Adjust padding for mobile
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              sx={{
                textAlign: isMobile ? 'center' : 'left',
                fontSize: isMobile ? '12px' : '14px', // Smaller font size for a compact look
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
              justifyContent: isMobile ? 'center' : 'flex-end', // Center icons on mobile
              alignItems: 'center',
            }}
          >
            <IconButton sx={{ color: '#ffffff', padding: '6px' }}> {/* Smaller icon button */}
              <LinkedInIcon fontSize="small" /> {/* Smaller icon */}
            </IconButton>
            <IconButton sx={{ color: '#ffffff', padding: '6px' }}> {/* Smaller icon button */}
              <FacebookIcon fontSize="small" /> {/* Smaller icon */}
            </IconButton>
            <IconButton sx={{ color: '#ffffff', padding: '6px' }}> {/* Smaller icon button */}
              <TwitterIcon fontSize="small" /> {/* Smaller icon */}
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
