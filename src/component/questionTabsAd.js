import React, { useState } from "react";
import { Box, Tab, Tabs, Grid } from "@mui/material";
import QuestionsCard from "./questionsCard";
import QuestionsAccordion from "./questionsManage";
import axios from "axios";

const questions = axios.get("");
const QuestionsTabAd = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Tab label="My Questions" />
      </Tabs>
      <Box sx={{ padding: "20px", paddingTop: "40px" }}>
        {value === 0 && (
          <Grid container spacing={3}>
            {questions.map((question) => (
              <Grid item xs={12} sm={6} md={4} key={question.id}>
                <QuestionsCard question={question} />
              </Grid>
            ))}
          </Grid>
        )}
        {value === 1 && <QuestionsAccordion />}
      </Box>
    </Box>
  );
};

export default QuestionsTabAd;
