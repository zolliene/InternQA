import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

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

// Yup validation schema
const validationSchema = Yup.object().shape({
    newQuestion: Yup.string().required('The question field cannot be empty'),
});

const QuestionsAccordion = () => {
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);

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

    return (
        <Box sx={{ width: '60%', margin: 'auto', paddingTop: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#5A67D8',
                        color: '#ffffff',
                        marginBottom: '20px',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: '#b3b8e6',
                        },
                    }}
                    onClick={handleClickOpen}
                >
                    Add new questions
                </Button>
            </Box>
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography variant="body2" sx={{ marginBottom: '8px', textAlign:'left' }}>
                                {question.content || "No details available."}
                            </Typography>
                            <Box>
                                <IconButton onClick={() => handleEdit(question.id)} sx={{ color: '#2D3748' }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(question.id)} sx={{ color: '#2D3748' }}>
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
                        width: '450px',
                        maxWidth: 'none'
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Add a New Question
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                
                <Formik
                    initialValues={{ newQuestion: '' }}
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
                                        marginTop: '16px',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#ccc',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#5A67D8',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#5A67D8',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#5A67D8',
                                        },
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    type="submit"
                                    color="primary"
                                    sx={{
                                        color:'#5A67D8',
                                        '&:hover': {
                                            backgroundColor: '#5A67D8',
                                            color:'white'
                                        },
                                        '&:focus': {
                                            backgroundColor: '#5A67D8', 
                                        },
                                        '&:active': {
                                            backgroundColor: '#5A67D8',
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

            <Box sx={{ marginTop: '20px', textAlign: 'left' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <Box component="span" sx={{ backgroundColor: '#5A67D8', borderRadius: '50%', display: 'inline-block', width: '15px', height: '15px', marginRight: '8px' }} />
                    <Typography variant="body2" sx={{ color: '#212121', fontWeight: 'bold' }}>
                        : selected question
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <Box component="span" sx={{ backgroundColor: '#E2E8F0', borderRadius: '50%', display: 'inline-block', width: '15px', height: '15px', marginRight: '8px' }} />
                    <Typography variant="body2" sx={{ color: '#212121', fontWeight: 'bold' }}>
                        : answered question
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ backgroundColor: '#ffffff', borderRadius: '50%', display: 'inline-block', width: '15px', height: '15px', marginRight: '8px', border: '1px solid #2D3748' }} />
                    <Typography variant="body2" sx={{ color: '#212121', fontWeight: 'bold' }}>
                        : unanswered question
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default QuestionsAccordion;
