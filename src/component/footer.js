import React from 'react';
import { Box, Typography, TextField, Button, IconButton, Grid } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#3f51b5', color: '#ffffff', padding: '20px 20px', borderRadius: '16px 16px 0 0' }}>
            <Grid container spacing={1}>
            </Grid>
            <Box sx={{ marginTop: '20px', borderTop: '1px solid #ffffff', paddingTop: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2">© 2023 Amazing Tech. All Rights Reserved.</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
