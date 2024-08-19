import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const QuestionsCard = ({ question }) => {
    if (!question) {
        return null;
    }

    const { liked = false, text, answers = 0 } = question;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <Card
                sx={{
                    backgroundColor: liked ? '#5A67D8' : '#E2E8F0',
                    color: liked ? '#ffffff' : '#2D3748',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    height: 'fit-content',
                    width: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px',
                }}
            >
                <CardContent sx={{ padding: 0, flexGrow: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', marginBottom: '8px' }}
                    >
                        {text}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            sx={{
                                textTransform: 'none',
                                padding: 0,
                                minWidth: 'auto',
                                color: liked ? '#ffffff' : '#2D3748',
                                display: 'flex',
                                alignItems: 'center',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                }
                            }}
                        >
                            <ArrowForwardIcon
                                sx={{
                                    fontSize: '20px', // Adjust the size of the arrow if needed
                                    marginLeft: '4px', // Space between the text and the icon
                                    color: liked ? '#ffffff' : '#2D3748',
                                }}
                            />
                            View Answer
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton size="small">
                            <FavoriteIcon sx={{ color: liked ? '#ffffff' : '#2D3748' }} />
                        </IconButton>
                        <Typography variant="body2">{answers}</Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default QuestionsCard;
