// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   IconButton,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   TextField,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAnswers, updateAnswer } from "../../features/answerslice"; // Assume you have an updateAnswer action

// const QuestionsCardAd = ({ question, likes }) => {
//   const [open, setOpen] = useState(false);
//   const answers = useSelector((state) => state.answers.items || []);
//   const [currentAnswer, setCurrentAnswer] = useState(null);
//   const [editedAnswer, setEditedAnswer] = useState(""); // For storing edited answer
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (answers && question) {
//       const answer = answers.find(
//         (ans) => parseInt(ans.questionId) === parseInt(question.id)
//       );
//       setCurrentAnswer(answer);
//       setEditedAnswer(answer ? answer.content : ""); // Set initial edited content
//     }
//   }, [answers, question]);

//   useEffect(() => {
//     dispatch(fetchAnswers());
//   }, [dispatch]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSave = () => {
//     if (currentAnswer) {
//       dispatch(updateAnswer({ ...currentAnswer, content: editedAnswer }));
//     }
//     setOpen(false);
//   };

//   // Simulate checking if the user is admin
//   const isAdmin = true; // Replace with actual admin check logic

//   return (
//     <>
//       <Box
//         sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
//       >
//         <Card
//           sx={{
//             backgroundColor: question.liked ? "#5A67D8" : "#E2E8F0",
//             color: question.liked ? "#ffffff" : "#2D3748",
//             borderRadius: "16px",
//             boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//             height: "fit-content",
//             width: "500px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             padding: "16px",
//           }}
//         >
//           <CardContent sx={{ padding: 0, flexGrow: 1 }}>
//             <Typography
//               variant="h6"
//               sx={{ fontWeight: "bold", marginBottom: "8px" }}
//             >
//               {question.content}
//             </Typography>
//           </CardContent>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Button
//                 onClick={handleClickOpen}
//                 sx={{
//                   textTransform: "none",
//                   padding: 0,
//                   minWidth: "auto",
//                   color: question.liked ? "#ffffff" : "#2D3748",
//                   display: "flex",
//                   alignItems: "center",
//                   "&:hover": {
//                     backgroundColor: "transparent",
//                   },
//                 }}
//               >
//                 <ArrowForwardIcon
//                   sx={{
//                     fontSize: "20px",
//                     marginLeft: "4px",
//                     color: question.liked ? "#ffffff" : "#2D3748",
//                   }}
//                 />
//                 View Answer
//               </Button>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <IconButton size="small">
//                 <FavoriteIcon
//                   sx={{ color: question.liked ? "#ffffff" : "#2D3748" }}
//                 />
//               </IconButton>
//               <Typography variant="body2">{likes?.length || 0}</Typography>
//             </Box>
//           </Box>
//         </Card>
//       </Box>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           sx: {
//             backgroundColor: "#5A67D8",
//             color: "#ffffff",
//             padding: "16px",
//             borderRadius: "16px",
//           },
//         }}
//       >
//         <DialogContent>
//           {isAdmin ? (
//             <TextField
//               fullWidth
//               multiline
//               rows={4}
//               value={editedAnswer}
//               onChange={(e) => setEditedAnswer(e.target.value)}
//               variant="outlined"
//               sx={{
//                 backgroundColor: "#ffffff",
//                 borderRadius: "8px",
//                 color: "#000000",
//               }}
//             />
//           ) : (
//             <DialogContentText sx={{ color: "#ffffff" }}>
//               {currentAnswer ? currentAnswer.content : "NO DATA"}
//             </DialogContentText>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: "flex-start" }}>
//           <Button
//             onClick={handleClose}
//             sx={{ color: "#ffffff", fontSize: "10px" }}
//           >
//             Close ×
//           </Button>
//           {isAdmin && (
//             <Button
//               onClick={handleSave}
//               sx={{ color: "#ffffff", fontSize: "10px" }}
//             >
//               Save
//             </Button>
//           )}
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default QuestionsCardAd;
import React, { useEffect, useState } from "react";
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
  TextField,
  DialogContentText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnswers, updateAnswer } from "../../features/answerslice"; // Assume you have an updateAnswer action

const QuestionsCardAd = ({ question, likes }) => {
  const [open, setOpen] = useState(false);
  const answers = useSelector((state) => state.answers.items || []);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [editedAnswer, setEditedAnswer] = useState(""); // For storing edited answer
  const dispatch = useDispatch();

  useEffect(() => {
    if (answers && question) {
      const answer = answers.find(
        (ans) => parseInt(ans.questionId) === parseInt(question.id)
      );
      setCurrentAnswer(answer);
      setEditedAnswer(answer ? answer.content : ""); // Set initial edited content
    }
  }, [answers, question]);

  useEffect(() => {
    dispatch(fetchAnswers());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (currentAnswer) {
      dispatch(updateAnswer({ ...currentAnswer, content: editedAnswer }));
    }
    setOpen(false);
  };

  // Simulate checking if the user is admin
  const isAdmin = true; // Replace with actual admin check logic

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <Card
          sx={{
            backgroundColor: question.liked ? "#5A67D8" : "#E2E8F0",
            color: question.liked ? "#ffffff" : "#2D3748",
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
                  color: question.liked ? "#ffffff" : "#2D3748",
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
                    color: question.liked ? "#ffffff" : "#2D3748",
                  }}
                />
                View Answer
              </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton size="small">
                <FavoriteIcon
                  sx={{ color: question.liked ? "#ffffff" : "#2D3748" }}
                />
              </IconButton>
              <Typography variant="body2">{likes?.length || 0}</Typography>
            </Box>
          </Box>
        </Card>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#5A67D8",
            color: "#ffffff",
            padding: "20px",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "600px",
          },
        }}
      >
        <DialogContent sx={{ paddingBottom: "0", overflow: "hidden" }}>
          {isAdmin ? (
            <TextField
              fullWidth
              multiline
              rows={4}
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                color: "#000000",
                fontSize: "16px",
                padding: "10px",
                marginBottom: "10px", // Add margin to prevent overflow
                border: "none",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            />
          ) : (
            <DialogContentText sx={{ color: "#ffffff", fontSize: "16px" }}>
              {currentAnswer ? currentAnswer.content : "NO DATA"}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "space-between", padding: "0 16px 8px" }}
        >
          <Button
            onClick={handleClose}
            sx={{ color: "#ffffff", fontSize: "14px" }}
          >
            Close ×
          </Button>
          {isAdmin && (
            <Button
              onClick={handleSave}
              sx={{
                backgroundColor: "#ffffff",
                color: "#5A67D8",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionsCardAd;
