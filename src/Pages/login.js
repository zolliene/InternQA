import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton, useMediaQuery } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import backgroundImage from '../image/loginBackground.png'; 
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: isMobile ? 'center' : 'flex-end', 
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingRight: isMobile ? '0.5rem' : '5%',
        paddingLeft: isMobile ? '0.5rem' : '0', 
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          width: isMobile ? '100%' : '40%',
          height: isMobile ? 'auto' : '80%',
          borderRadius: isMobile ? '0' : '10px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: isMobile ? 'center' : 'flex-start',
            padding: isMobile ? '1rem' : '2rem',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4 }}>
            Welcome to <br/><span style={{ color: '#3f51b5' }}>Amazing Tech</span>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1 }} />,
            }}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1 }} />,
              endAdornment: (
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#3f51b5',
              color: '#fff',
              fontWeight: 'bold',
              height: '50px',
              mb: 2,
            }}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don’t have an account? &nbsp;
            <Link to="sign-up" style={{ color: '#3f51b5' }}>Sign up</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
