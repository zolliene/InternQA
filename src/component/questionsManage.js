import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_BASE_URL from "../config";
import { useDispatch } from "react-redux";
import { addQuestion, deleteQuestion } from "../features/questionsSlice";

// Yup validation schema for editing
const validationSchema = Yup.object().shape({
  editQuestion: Yup.string().required("The question field cannot be empty"),
});

const QuestionsAccordion = ({ questions, answers }) => {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.id) {
      const userQuestions = questions.filter(
        (question) =>
          parseInt(question.userId) === parseInt(user.id) && !question.isDeleted
      );

      setFilteredQuestions(userQuestions);
    }
  }, [questions]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditOpen = (question) => {
    setCurrentQuestion(question);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDeleteOpen = (question) => {
    setCurrentQuestion(question);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEditSubmit = async (values, { setSubmitting }) => {
    try {
      // Gửi yêu cầu cập nhật câu hỏi
      await axios.patch(`${API_BASE_URL}/questions/${currentQuestion.id}`, {
        content: values.editQuestion,
      });

      // Cập nhật danh sách câu hỏi
      setFilteredQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === currentQuestion.id
            ? { ...question, content: values.editQuestion }
            : question
        )
      );

      setSubmitting(false);
      handleEditClose();
      setSnackbarMessage("Edit question successful");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to update question:", error);
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Gửi yêu cầu cập nhật câu hỏi thành isDeleted: true
      await axios.patch(`${API_BASE_URL}/questions/${currentQuestion.id}`, {
        isDeleted: true,
      });
      dispatch(deleteQuestion(currentQuestion.id));
      // Cập nhật danh sách câu hỏi đã lọc để loại bỏ câu hỏi vừa bị xóa
      setFilteredQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== currentQuestion.id)
      );

      setDeleteOpen(false);
      setSnackbarMessage("Delete successful");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(`Error deleting question ID ${currentQuestion.id}:`, error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      // Gọi hàm addQuestion từ slice Redux và truyền dữ liệu cần thiết
      await dispatch(
        addQuestion({ content: values.newQuestion, userId: user.id })
      );
      setSubmitting(false);
      handleClose();
      setSnackbarMessage("Add question successful");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to add question:", error);
      setSubmitting(false);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "selected":
        return { backgroundColor: "#5A67D8", color: "#ffffff" };
      case "answered":
        return { backgroundColor: "#E2E8F0", color: "#2D3748" };
      default:
        return { backgroundColor: "#ffffff", color: "#2D3748" };
    }
  };

  return (
    <Box sx={{ width: "60%", margin: "auto", paddingTop: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#5A67D8",
            color: "#ffffff",
            marginBottom: "20px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#b3b8e6",
            },
          }}
          onClick={handleClickOpen}
        >
          Add new questions
        </Button>
      </Box>
      {filteredQuestions.map((question, index) => {
        // Tìm câu trả lời tương ứng với câu hỏi hiện tại
        const relatedAnswers = answers.filter(
          (answer) => parseInt(answer.questionId) === parseInt(question.id)
        );
        return (
          <Accordion
            key={question.id}
            expanded={expanded === `panel${question.id}`}
            onChange={handleChange(`panel${question.id}`)}
            sx={{
              ...getStatusStyles(question.status),
              borderRadius: "16px",
              marginBottom: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <AccordionSummary
              expandIcon={
                expanded === `panel${question.id}` ? (
                  <ExpandLessIcon
                    sx={{
                      color:
                        question.status === "selected" ? "#ffffff" : "#2D3748",
                    }}
                  />
                ) : (
                  <ExpandMoreIcon
                    sx={{
                      color:
                        question.status === "selected" ? "#ffffff" : "#2D3748",
                    }}
                  />
                )
              }
              aria-controls={`panel${question.id}-content`}
              id={`panel${question.id}-header`}
              sx={{ padding: "16px" }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {index < 10 ? `0${index + 1}` : index + 1} {question.content}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ marginBottom: "8px", textAlign: "left" }}
                >
                  {relatedAnswers.length === 0 ? "No details available." : ""}
                </Typography>

                {/* Hiển thị tất cả các câu trả lời liên quan */}
                {relatedAnswers.map((answer) => (
                  <Typography
                    key={answer.id}
                    variant="body2"
                    sx={{ marginTop: "16px", color: "#4A5568" }}
                  >
                    <strong>Answer:</strong> {answer.content}
                  </Typography>
                ))}

                <Box>
                  <IconButton
                    onClick={() => handleEditOpen(question)}
                    sx={{ color: "#2D3748" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteOpen(question)}
                    sx={{ color: "#2D3748" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}

      {/* Add New Question */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            width: "450px",
            maxWidth: "none",
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Add a New Question
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Formik
          initialValues={{ newQuestion: "" }}
          validationSchema={Yup.object().shape({
            newQuestion: Yup.string().required(
              "The question field cannot be empty"
            ),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogContent>
                <DialogContentText>
                  Please enter your question below:
                </DialogContentText>
                <Field
                  as={TextField}
                  name="newQuestion"
                  label="New Question"
                  fullWidth
                  variant="outlined"
                  error={touched.newQuestion && !!errors.newQuestion}
                  helperText={touched.newQuestion && errors.newQuestion}
                  sx={{
                    marginTop: "16px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5A67D8",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5A67D8",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#5A67D8",
                    },
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  color="primary"
                  sx={{
                    color: "#5A67D8",
                    "&:hover": {
                      backgroundColor: "#5A67D8",
                      color: "white",
                    },
                    "&:focus": {
                      backgroundColor: "#5A67D8",
                    },
                    "&:active": {
                      backgroundColor: "#5A67D8",
                    },
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Edit Question */}
      {currentQuestion && (
        <Dialog
          open={editOpen}
          onClose={handleEditClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              width: "450px",
              maxWidth: "none",
            },
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            Edit Question
            <IconButton
              aria-label="close"
              onClick={handleEditClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <Formik
            initialValues={{ editQuestion: currentQuestion.content }}
            validationSchema={validationSchema}
            onSubmit={handleEditSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <DialogContent>
                  <DialogContentText>
                    Please edit your question below:
                  </DialogContentText>
                  <Field
                    as={TextField}
                    name="editQuestion"
                    label="Edit Question"
                    fullWidth
                    variant="outlined"
                    error={touched.editQuestion && !!errors.editQuestion}
                    helperText={touched.editQuestion && errors.editQuestion}
                    sx={{
                      marginTop: "16px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ccc",
                        },
                        "&:hover fieldset": {
                          borderColor: "#5A67D8",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#5A67D8",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#5A67D8",
                      },
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    color="primary"
                    sx={{
                      color: "#5A67D8",
                      "&:hover": {
                        backgroundColor: "#5A67D8",
                        color: "white",
                      },
                      "&:focus": {
                        backgroundColor: "#5A67D8",
                      },
                      "&:active": {
                        backgroundColor: "#5A67D8",
                      },
                    }}
                  >
                    Edit
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
      )}

      {/* Delete Confirmation */}
      {currentQuestion && (
        <Dialog
          open={deleteOpen}
          onClose={handleDeleteClose}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this question?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Snackbar for success messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ marginTop: "20px", textAlign: "left" }}>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <Box
            component="span"
            sx={{
              backgroundColor: "#5A67D8",
              borderRadius: "50%",
              display: "inline-block",
              width: "15px",
              height: "15px",
              marginRight: "8px",
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: "#212121", fontWeight: "bold" }}
          >
            : selected question
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <Box
            component="span"
            sx={{
              backgroundColor: "#E2E8F0",
              borderRadius: "50%",
              display: "inline-block",
              width: "15px",
              height: "15px",
              marginRight: "8px",
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: "#212121", fontWeight: "bold" }}
          >
            : answered question
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="span"
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              display: "inline-block",
              width: "15px",
              height: "15px",
              marginRight: "8px",
              border: "1px solid #2D3748",
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: "#212121", fontWeight: "bold" }}
          >
            : unanswered question
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionsAccordion;
