import { Box, Button, Card, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../Home/Navbar'

const Details = ({ game }) => {

    console.log("gameeeee", game)
    return (

        <Box
            sx={{
                backgroundImage: `url(${game.screenshots[0].url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 4,
                borderRadius: 2,
                minHeight: '450px',
                color: 'white',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: 2,
                    zIndex: 1,
                }}
            />

            <Box sx={{ zIndex: 2, maxWidth: '60%' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ marginBottom: 4 }}>
                    {game.name}
                </Typography>
                <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.5,
                    }}
                >
                    {game.summary}
                </Typography>
            </Box>

            <Box sx={{ zIndex: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#2ecc71',
                        color: 'white',
                        borderRadius: '2rem',
                        px: 5,
                        py: 1.5,
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#27ae60',
                        },
                    }}
                >
                    Oyna
                </Button>
            </Box>
        </Box>
    )
}

export default Details