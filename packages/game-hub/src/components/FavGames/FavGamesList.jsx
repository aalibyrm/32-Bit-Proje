import { Box, Card, CardMedia, Grid, Typography, useTheme } from '@mui/material'
import React from 'react'
import Navbar from '../Home/Navbar'
import { useNavigate } from 'react-router-dom';
import { useGames } from '../../games/GameContext';

const FavGamesList = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { games } = useGames();

    const favGames = JSON.parse(localStorage.getItem("favoriteGames")) || [];

    const favFilter = games.filter(game => favGames.includes(game.name));

    return (
        <Box p={2} sx={{ overflowY: 'auto', height: '100%', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <Box><Navbar /></Box>
            <Box sx={{ my: 3 }}>
                <Grid container spacing={2}>
                    {favFilter.map((game) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={game.id}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Card
                                    sx={{
                                        width: '100%',
                                        aspectRatio: '1 / 1',
                                        bgcolor: theme.palette.background.paper,
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': { transform: 'scale(1.05)' },
                                    }}
                                    onClick={() => navigate("/game-details/" + game.id)}
                                >
                                    <CardMedia
                                        component="img"
                                        image={game.cover.url}
                                        alt={game.title}
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </Card>
                                <Typography variant="subtitle1" fontWeight="bold" mt={1} color="text.primary">
                                    {game.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default FavGamesList