import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const QuestionsCardAd = ({ question, likes, answers }) => {
  const [open, setOpen] = useState(false);

  if (!question) {
    return null;
  }

  const { liked = false, text } = question;

  // Kiểm tra question.id và in ra likes để xác nhận dữ liệu
  console.log("Question ID:", question.id);
  console.log("Likes Data:", likes);
  console.log("Answers Data:", answers);

  // Tìm số lượng likes cho câu hỏi hiện tại
  const questionLikes = likes.find(
    (like) => parseInt(like.questionId) === parseInt(question.id)
  );

  // Lấy số lượng likes hoặc gán giá trị mặc định là 0
  const likesCount = questionLikes ? questionLikes.likedBy.length : 0;
  const answer = answers.find(
    (ans) => parseInt(ans.questionId) === parseInt(question.id)
  );
  console.log("Question Likes:", questionLikes);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <Card
          sx={{
            backgroundColor: liked ? "#5A67D8" : "#E2E8F0",
            color: liked ? "#ffffff" : "#2D3748",
            borderRadius: "16px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            height: "fit-content",
            width: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <CardContent sx={{ padding: 0, flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "8px" }}
            >
              {question.content}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={handleClickOpen}
                sx={{
                  textTransform: "none",
                  padding: 0,
                  minWidth: "auto",
                  color: liked ? "#ffffff" : "#2D3748",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ArrowForwardIcon
                  sx={{
                    fontSize: "20px", // Adjust the size of the arrow if needed
                    marginLeft: "4px", // Space between the text and the icon
                    color: liked ? "#ffffff" : "#2D3748",
                  }}
                />
                View Answer
              </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton size="small">
                <FavoriteIcon sx={{ color: liked ? "#ffffff" : "#2D3748" }} />
              </IconButton>
              <Typography variant="body2">{likesCount}</Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "#5A67D8", // Matches the card background color
            color: "#ffffff", // Text color
            padding: "16px",
            borderRadius: "16px", // Rounded corners
          },
        }}
      >
        <DialogContent>
          <DialogContentText sx={{ color: "#ffffff" }}>
            {answer ? answer.content : "NO DATA"}
            {/* Use the question text or another piece of text */}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-start" }}>
          {" "}
          {/* Align to the left */}
          <Button
            onClick={handleClose}
            sx={{ color: "#ffffff", fontSize: "10px" }}
          >
            Close ×
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionsCardAd;
