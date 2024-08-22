import React from "react";
import { Button, Typography, Box, Paper, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleLogout = () => {
    // Clear user information from sessionStorage
    sessionStorage.removeItem("user");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingRight: isMobile ? '0.5rem' : '5%',
        paddingLeft: isMobile ? '0.5rem' : '0',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          width: isMobile ? '100%' : '40%',
          height: isMobile ? 'auto' : '50%',
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
            alignItems: 'center',
            padding: isMobile ? '1rem' : '2rem',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
            Are you sure you want to logout?
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#3f51b5",
              color: "#fff",
              fontWeight: "bold",
              height: "50px",
              mb: 2,
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              color: "#3f51b5",
              borderColor: "#3f51b5",
              fontWeight: "bold",
              height: "50px",
            }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LogoutPage;
