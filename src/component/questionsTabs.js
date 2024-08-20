// import React, { useState } from 'react';
// import { Box, Tab, Tabs, Grid } from '@mui/material';
// import QuestionsCard from './questionsCard';
// import QuestionsAccordion from './questionsManage';

// const questions = [
//   { id: 1, text: "What are the company’s core values and mission?", answers: 12, liked: false },
//   { id: 2, text: "What are the security protocols I need to follow?", answers: 2, liked: false },
//   { id: 3, text: "Are there any specific tools or software I need to install?", answers: 28, liked: true },
//   { id: 4, text: "How is my performance evaluated?", answers: 0, liked: false },
//   { id: 5, text: "Who can I reach out to if I need clarification on a task?", answers: 8, liked: false },
//   { id: 6, text: "How often are team meetings held?", answers: 21, liked: true },
//   { id: 7, text: "Who can I reach out to if I need clarification on a task?", answers: 8, liked: false },
//   { id: 8, text: "Who can I reach out to if I need clarification on a task?", answers: 8, liked: false },
// ];

// const QuestionsTab = () => {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '15px' }}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         centered
//         TabIndicatorProps={{ style: { display: 'none' } }}
//         sx={{
//           '& .MuiTab-root': {
//             fontWeight: 'bold',
//             color: '#000', // Default text color
//             textAlign: 'center',
//             minWidth: '50%', // Ensure each tab takes up half the width of the container
//             margin: '0 0px',
//             backgroundColor: 'transparent', // Remove background color
//             borderRadius: '8px', // Make the tabs rounded
//             '&.Mui-selected': {
//               backgroundColor: '#9aa0e1', // Light blue background for the selected tab
//               color: '#ffffff', // White text color when selected
//             },
//             '&:hover': {
//               backgroundColor: '#b3b8e6', // Slightly darker blue on hover
//             },
//           },
//           '& .MuiTabs-flexContainer': {
//             justifyContent: 'center',
//             backgroundColor: '#7289da',
//             borderRadius: '8px',
//             padding: '5px',
//           },
//         }}
//       >
//         <Tab label="All Questions" />
//         <Tab label="My Questions" />
//       </Tabs>
//       <Box sx={{ padding: '20px', paddingTop: '40px', paddingBottom:'100px' }}>
//         {value === 0 && (
//           <Grid container spacing={3}>
//             {questions.map((question) => (
//               <Grid item xs={12} sm={6} md={4} key={question.id}>
//                 <QuestionsCard question={question} />
//               </Grid>
//             ))}
//           </Grid>
//         )}
//         {value === 1 && <QuestionsAccordion />}
//       </Box>
//     </Box>
//   );
// };

// export default QuestionsTab;
import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs, Grid } from "@mui/material";

import axios from "axios";
import API_BASE_URL from "../config";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../features/questionsSlice";
import QuestionsAccordion from "./questionsManage";
import QuestionsCard from "./questionsCard";

const QuestionsTab = () => {
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
  const [answers, setAnswer] = useState([]);

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
    const fetchAnswer = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/answers`);
        setAnswer(response.data);
      } catch (error) {
        console.error("Error fetching likes data:", error);
      }
    };
    fetchLikes();
    fetchAnswer();
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
          '& .MuiTab-root': {
            fontWeight: 'bold',
            color: '#000', // Default text color
            textAlign: 'center',
            minWidth: '50%', // Ensure each tab takes up half the width of the container
            margin: '0 0px',
            backgroundColor: 'transparent', // Remove background color
            borderRadius: '8px', // Make the tabs rounded
            '&.Mui-selected': {
              backgroundColor: '#5A67D8', // Light blue background for the selected tab
              color: '#ffffff', // White text color when selected
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
        <Tab label="My Questions" />
      </Tabs>
      <Box sx={{ padding: "20px", paddingTop: "40px" }}>
        {value === 0 && (
          <Grid container spacing={3}>
            {questions
              .slice()
              .reverse()
              .map(
                (question) =>
                  !question.isDeleted && (
                    <Grid item xs={12} sm={6} md={4} key={question.id}>
                      <QuestionsCard
                        question={question}
                        likes={likes}
                        answers={answers}
                      />
                    </Grid>
                  )
              )}
          </Grid>
        )}
        {value === 1 && (
          <QuestionsAccordion questions={questions} answers={answers} />
        )}
      </Box>
    </Box>
  );
};

export default QuestionsTab;
