import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs, Grid } from "@mui/material";
import QuestionsCardAd from "./questionsCardAd";
import QuestionsAccordionAd from "./questionsManageAd";
import axios from "axios";
import API_BASE_URL from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../../features/questionsSlice";

const QuestionsTabAd = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.items);
  const status = useSelector((state) => state.questions.status);
  const error = useSelector((state) => state.questions.error);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu likes từ Mock API
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/likes`);
        setLikes(response.data);
      } catch (error) {
        console.error("Error fetching likes data:", error);
      }
    };

    fetchLikes();
  }, []);
  useEffect(() => {
    if (questions.length > 0) {
      const filteredQuestions = questions.filter(
        (question) => question.isAnswered
      );

      setAnsweredQuestions(filteredQuestions);
      setUnansweredQuestions(
        questions.filter((question) => question.isAnswered === false)
      );
    }
  }, [questions]);
  useEffect(() => {
    console.log(answeredQuestions);
    console.log(unansweredQuestions);
  }, [answeredQuestions, unansweredQuestions]);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuestions());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", marginTop: "15px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ style: { display: "none" } }}
        sx={{
          "& .MuiTab-root": {
            fontWeight: "bold",
            color: "#000", // Default text color
            textAlign: "center",
            minWidth: "50%", // Ensure each tab takes up half the width of the container
            margin: "0 0px",
            backgroundColor: "transparent", // Remove background color
            borderRadius: "8px", // Make the tabs rounded
            "&.Mui-selected": {
              backgroundColor: "#9aa0e1", // Light blue background for the selected tab
              color: "#ffffff", // White text color when selected
            },
            "&:hover": {
              backgroundColor: "#b3b8e6", // Slightly darker blue on hover
            },
          },
          "& .MuiTabs-flexContainer": {
            justifyContent: "center", // Center the tab labels
            backgroundColor: "#7289da", // Background color behind the tabs
            borderRadius: "8px", // Make the tab container rounded
            padding: "5px", // Add some padding around the tabs
          },
        }}
      >
        <Tab label="All Questions" />
        <Tab label="Unanswered Questions" />
      </Tabs>
      <Box sx={{ padding: "20px", paddingTop: "40px" }}>
        {value === 0 && (
          <Grid container spacing={3}>
            {answeredQuestions.map(
              (question) =>
                !question.isDeleted && (
                  <Grid item xs={12} sm={6} md={4} key={question.id}>
                    <QuestionsCardAd question={question} likes={likes} />
                  </Grid>
                )
            )}
          </Grid>
        )}
        {value === 1 && (
          <QuestionsAccordionAd
            unansweredQuestions={unansweredQuestions}
            setAnsweredQuestions={setAnsweredQuestions}
            setUnansweredQuestions={setUnansweredQuestions}
          />
        )}
      </Box>
    </Box>
  );
};

export default QuestionsTabAd;
