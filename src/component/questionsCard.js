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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const QuestionsCard = ({ question, likes, answers, currentUserId }) => {
  const [open, setOpen] = useState(false);

  // Find the like data for the current question
  const questionLikes = question
    ? likes.find((like) => parseInt(like.questionId) === parseInt(question.id))
    : null;

  // Determine if the current user has liked this question
  const userHasLiked = questionLikes
    ? questionLikes.likedBy.includes(parseInt(currentUserId))
    : false;

  // Local state for managing likes
  const [likesCount, setLikesCount] = useState(
    questionLikes ? questionLikes.likesCount : 0
  );
  const [isLiked, setIsLiked] = useState(userHasLiked);

  if (!question) {
    return null;
  }

  const handleLikeClick = () => {
    if (!questionLikes) {
      // If there are no likes for the question, initialize the likes for this question
      likes.push({
        questionId: question.id,
        likesCount: 1,
        likedBy: [parseInt(currentUserId)],
      });
      setLikesCount(1);
      setIsLiked(true);
    } else {
      // Toggle like state
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);
  
      if (newLikeStatus) {
        // User likes the question
        setLikesCount(likesCount + 1);
        questionLikes.likedBy.push(parseInt(currentUserId));
      } else {
        // User unlikes the question
        setLikesCount(likesCount - 1);
        questionLikes.likedBy = questionLikes.likedBy.filter(
          (id) => id !== parseInt(currentUserId)
        );
      }
  
      // Update the likes count in the data
      questionLikes.likesCount = newLikeStatus
        ? likesCount + 1
        : likesCount - 1;
    }
  };

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
            backgroundColor: "#E2E8F0", // Static background color
            color: "#2D3748", // Static text color
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
                  color: "#2D3748",
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
                    color: "#2D3748",
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
                  <FavoriteBorderIcon sx={{ color: "#2D3748" }} />
                )}
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
            {answers.find(
              (ans) => parseInt(ans.questionId) === parseInt(question.id)
            )?.content || "NO DATA"}
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
