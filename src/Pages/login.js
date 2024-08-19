import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import backgroundImage from "../image/loginBackground.png";
import API_BASE_URL from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      // Gửi yêu cầu tới Mock API để kiểm tra thông tin đăng nhập
      const response = await axios.get(`${API_BASE_URL}/users`, {
        params: { email, password },
      });
      console.log(response.data);
      // Kiểm tra thông tin người dùng có tồn tại trong Mock API không
      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Nếu thông tin đúng, lưu thông tin người dùng vào sessionStorage
        sessionStorage.setItem("user", JSON.stringify(user));

        // Chuyển hướng tới trang khác, ví dụ: Dashboard
        navigate("/home-page");
      } else {
        // Thông báo lỗi nếu thông tin đăng nhập không chính xác
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingRight: "5%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          width: "50%",
          height: "500px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "2rem",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 4, textAlign: "left" }}
          >
            Welcome to <br />
            <span style={{ color: "#3f51b5" }}>Amazing Tech</span>
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
            onChange={handleEmailChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1 }} />,
              endAdornment: (
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
            sx={{ mb: 3 }}
            onChange={handlePasswordChange}
          />
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
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", width: "100%" }}
          >
            Don’t have an account? &nbsp;
            <a
              href="/signup"
              style={{ color: "#3f51b5", textDecoration: "none" }}
            >
              Sign up
            </a>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
