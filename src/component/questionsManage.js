import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const questions = [
  { id: 1, title: "Consultation", content: "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.", status: "selected" },
  { id: 2, title: "Research and Strategy Development", content: "", status: "unanswered" },
  { id: 3, title: "Implementation", content: "", status: "unanswered" },
  { id: 4, title: "Monitoring and Optimization", content: "", status: "unanswered" },
  { id: 5, title: "Reporting and Communication", content: "", status: "answered" },
  { id: 6, title: "Continual Improvement", content: "", status: "answered" },
];

const getStatusStyles = (status) => {
  switch (status) {
    case "selected":
      return { backgroundColor: '#5A67D8', color: '#ffffff' };
    case "answered":
      return { backgroundColor: '#E2E8F0', color: '#2D3748' };
    default:
      return { backgroundColor: '#ffffff', color: '#2D3748' };
  }
};

const QuestionsAccordion = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '60%', margin: 'auto', paddingTop: '20px' }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#5A67D8',
          color: '#ffffff',
          marginBottom: '20px',
          borderRadius: '8px',
        }}
      >
        Add new questions
      </Button>
      {questions.map((question) => (
        <Accordion
          key={question.id}
          expanded={expanded === `panel${question.id}`}
          onChange={handleChange(`panel${question.id}`)}
          sx={{
            ...getStatusStyles(question.status),
            borderRadius: '16px',
            marginBottom: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <AccordionSummary
            expandIcon={
              expanded === `panel${question.id}` ? (
                <ExpandLessIcon sx={{ color: question.status === 'selected' ? '#ffffff' : '#2D3748' }} />
              ) : (
                <ExpandMoreIcon sx={{ color: question.status === 'selected' ? '#ffffff' : '#2D3748' }} />
              )
            }
            aria-controls={`panel${question.id}-content`}
            id={`panel${question.id}-header`}
            sx={{ padding: '16px' }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              0{question.id} {question.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              {question.content || "No details available."}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="body2" sx={{ color: '#5A67D8', fontWeight: 'bold' }}>
          <Box component="span" sx={{ backgroundColor: '#5A67D8', borderRadius: '50%', display: 'inline-block', width: '15px', height: '15px', marginRight: '8px' }} />
          : selected question
        </Typography>
        <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 'bold' }}>
          <Box component="span" sx={{ backgroundColor: '#E2E8F0', borderRadius: '50%', display: 'inline-block', width: '15px', height: '15px', marginRight: '8px' }} />
          : answered question
        </Typography>
        <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
          <Box component="span" sx={{ backgroundColor: '#ffffff', borderRadius: '50%', display: 'inline-block', width: '15px', height: '15px', marginRight: '8px', border: '1px solid #2D3748' }} />
          : unanswered question
        </Typography>
      </Box>
    </Box>
  );
};

export default QuestionsAccordion;
