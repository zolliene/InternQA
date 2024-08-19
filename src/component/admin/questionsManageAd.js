import React, { useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_BASE_URL from "../../config";
import { useDispatch } from "react-redux";
import { addAnswer } from "../../features/answerslice";

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

// Yup validation schema
const validationSchema = Yup.object().shape({
  newQuestion: Yup.string().required("The question field cannot be empty"),
});

const QuestionsAccordion = ({
  unansweredQuestions,
  setAnsweredQuestions,
  setUnansweredQuestions,
}) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [answerContent, setAnswerContent] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("New question submitted:", values.newQuestion);
    setSubmitting(false);
    handleClose();
  };

  const handleEdit = (id) => {
    // Logic for editing the question
    console.log(`Edit question with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Logic for deleting the question
    console.log(`Delete question with id: ${id}`);
  };
  const handleAnswerSubmit = async (question) => {
    if (!answerContent.trim()) {
      console.error("Answer content cannot be empty");
      return;
    }

    try {
      // Bước 1: Lấy tất cả các câu trả lời từ Mock API
      const response = await axios.get(`${API_BASE_URL}/answers`);
      const allAnswers = response.data;

      // Bước 2: Tìm ID lớn nhất hiện có và tính toán ID mới
      const newId =
        allAnswers.length > 0
          ? Math.max(...allAnswers.map((answer) => parseInt(answer.id))) + 1
          : 1;

      // Bước 3: Tạo câu trả lời mới với ID tự tăng dần
      const newAnswer = {
        id: newId.toString(), // Chuyển đổi ID thành chuỗi nếu cần
        questionId: question.id,
        userId: question.userId,
        content: answerContent,
      };

      // Bước 4: Gửi câu trả lời mới lên Mock API
      await axios.post(`${API_BASE_URL}/answers`, newAnswer);

      // Bước 5: Cập nhật trạng thái câu hỏi là "isAnswered: true"
      await axios.patch(`${API_BASE_URL}/questions/${question.id}`, {
        isAnswered: true,
      });

      // Bước 6: Cập nhật Redux Store
      dispatch(addAnswer(newAnswer));
      console.log(`Answer for question ID ${question.id} added successfully.`);

      // Xóa nội dung sau khi gửi
      setAnswerContent("");

      // Cập nhật lại danh sách câu hỏi trong UI nếu cần thiết
      setUnansweredQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== question.id)
      );
      setAnsweredQuestions((prevAnswered) => [
        ...prevAnswered,
        { ...question, isAnswered: true },
      ]);
    } catch (error) {
      console.error("Error adding answer:", error);
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
      {unansweredQuestions.map((question, index) => (
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
              {/* <Typography
                variant="body2"
                sx={{ marginBottom: "8px", textAlign: "left" }}
              >
                {question.content || "No details available."}
              </Typography> */}
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Enter your answer here"
                variant="outlined"
                sx={{ marginBottom: "16px" }}
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
              />

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#5A67D8",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#4C51BF",
                  },
                }}
                onClick={() => handleAnswerSubmit(question)}
              >
                Submit Answer
              </Button>
              <Box>
                <IconButton
                  onClick={() => handleEdit(question.id)}
                  sx={{ color: "#2D3748" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(question.id)}
                  sx={{ color: "#2D3748" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

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
          validationSchema={validationSchema}
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
    </Box>
  );
};

export default QuestionsAccordion;
