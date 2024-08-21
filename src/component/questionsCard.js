import React, { useState, useEffect } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/system";

// Styled Card Component with hover effect and selected state
const StyledCard = styled(Card)(({ open }) => ({
  backgroundColor: open ? "#5A67D8" : "#E2E8F0",
  color: open ? "#ffffff" : "#2D3748", // Change text color based on background color
  borderRadius: "16px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  height: "fit-content",
  width: "500px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "16px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#5A67D8",
    color: "#ffffff", // Change text color when hovered
  },
}));

const QuestionsCard = ({
  question = {},
  likes = [],
  answers = [],
  currentUserId,
}) => {
  const [open, setOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Check if question is defined and get the like data for the current question
  const questionId = question?.id;
  const questionLikes = questionId
    ? likes.find((like) => parseInt(like.questionId) === parseInt(questionId))
    : null;

  // Determine if the current user has liked this question
  const userHasLiked = questionLikes
    ? questionLikes.likedBy.includes(parseInt(currentUserId))
    : false;

  // Set initial like state
  useEffect(() => {
    setIsLiked(userHasLiked);
    setLikesCount(questionLikes ? questionLikes.likesCount : 0);
  }, [userHasLiked, questionLikes]);

  const handleLikeClick = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setLikesCount(newLikeStatus ? likesCount + 1 : likesCount - 1);
    // Update likes data here...
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Find the answer for the current question
  const answer = answers.find(
    (ans) => parseInt(ans.questionId) === parseInt(questionId)
  );

  // Don't render the card if there is no valid question data
  if (!question?.content) {
    return null;
  }

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <StyledCard open={open}>
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
                  color: open ? "#ffffff" : "#2D3748", // Button text color based on card state
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ArrowForwardIcon
                  sx={{
                    fontSize: "20px",
                    marginLeft: "4px",
                    color: open ? "#ffffff" : "#2D3748", // Arrow color based on card state
                  }}
                />
                View Answer
              </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton size="small" onClick={handleLikeClick}>
                {isLiked ? (
                  <FavoriteIcon sx={{ color: "#FF0000" }} />
                ) : (
                  <FavoriteBorderIcon
                    sx={{ color: open ? "#ffffff" : "#2D3748" }}
                  />
                )}
              </IconButton>
              <Typography variant="body2">{likesCount}</Typography>
            </Box>
          </Box>
        </StyledCard>
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
            {answer?.content || "NO DATA"}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "flex-start" }}>
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

export default QuestionsCard;
