import React from 'react';
import { Box, Tab, Tabs, Grid } from '@mui/material';
import QuestionsCard from './questionsCard';

const questions = [
  { id: 1, text: "What are the company’s core values and mission?", answers: 12, liked: false },
  { id: 2, text: "What are the security protocols I need to follow?", answers: 2, liked: false },
  { id: 3, text: "Are there any specific tools or software I need to install?", answers: 28, liked: true },
  { id: 4, text: "How is my performance evaluated?", answers: 0, liked: false },
  { id: 5, text: "Who can I reach out to if I need clarification on a task?", answers: 8, liked: false },
  { id: 6, text: "How often are team meetings held?", answers: 21, liked: true }
];

const QuestionsTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: '15px' }}>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        centered 
        TabIndicatorProps={{ style: { display: 'none' } }} 
        sx={{
          '& .MuiTab-root': {
            fontWeight: 'bold',
            color: '#000', 
            textAlign: 'center',
            minWidth: '50%',
            margin: '0 0px',
            '&.Mui-selected': {
              color: '#007bff', 
            },
          },
          '& .MuiTabs-flexContainer': {
            justifyContent: 'center', 
          },
        }}
      >
        <Tab label="All Questions" />
        <Tab label="My Questions" />
      </Tabs>
      <Box sx={{ padding: '20px', paddingTop: '40px' }}>
        <Grid container spacing={3}> 
          {questions.map((question) => (
            <Grid item xs={12} sm={6} md={4} key={question.id}>
              <QuestionsCard question={question} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default QuestionsTab;
