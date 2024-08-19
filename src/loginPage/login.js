import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import backgroundImage from '../image/loginBackground.png'; 

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'flex-end', 
        alignItems: 'center',
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingRight: '200px' 
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          width: '700px',
          height: '800px',
          borderRadius: '10px',
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
            alignItems: 'flex-start', 
            padding: '2rem',
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'left' }}>
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
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', width: '100%' }}>
            Don’t have an account? &nbsp;
            <a href="/signup" style={{ color: '#3f51b5', textDecoration: 'none' }}>
              Sign up
            </a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
