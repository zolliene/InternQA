import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Email, Lock } from '@mui/icons-material';
import backgroundImage from '../image/loginBackground.png'; 
import { Link } from 'react-router-dom';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)'); 

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end', 
                height: '100vh',
                padding: isMobile ? '1rem' : '0', 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'white',
                    p: isMobile ? 2 : 4, 
                    borderRadius: 2,
                    boxShadow: 3,
                    width: isMobile ? '100%' : '500px', 
                    maxWidth: '500px', 
                    height: 'auto', 
                    minHeight: isMobile ? 'auto' : '400px', 
                    marginRight: isMobile ? '0' : '5%', 
                }}
            >
                <Typography
                    variant={isMobile ? 'h4' : 'h3'} 
                    sx={{ mb: 4, fontWeight: 'bold', color: '#3f51b5', textAlign: 'center' }}
                >
                    Create an Account
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Full Name"
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Person />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    margin="normal"
                    type="email"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Password"
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Confirm Password"
                    margin="normal"
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: '#3f51b5',
                        color: '#fff',
                        mt: 3,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: isMobile ? '0.9rem' : '1rem', 
                    }}
                >
                    Sign up
                </Button>
                <Typography
                    variant="body2"
                    sx={{ mt: 2, textAlign: 'center', fontSize: isMobile ? '0.8rem' : '1rem' }}
                >
                    Already have an account?{' '}
                    <Link to="/" style={{ color: '#3f51b5'}}>Log in</Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Register;
