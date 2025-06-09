import { Box, Card, CardMedia, Grid, Typography, useTheme } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
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
        <Box
            p={2}
            sx={{
                overflowY: 'auto',
                height: '100%',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                background: theme.palette.background.default,
                backgroundAttachment: 'fixed',
                minHeight: '100vh'
            }}
        >
            <Box><Navbar /></Box>
            <Box sx={{ my: 3 }}>
                <Grid container spacing={2}>
                    {favFilter.map((game) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={game.id}>
                            <Card
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    background: theme.palette.mode === 'dark'
                                        ? 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
                                        : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                                    boxShadow: theme.palette.mode === 'dark'
                                        ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(139, 69, 255, 0.2)'
                                        : '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(139, 69, 255, 0.15)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(139, 69, 255, 0.2)' : 'rgba(139, 69, 255, 0.1)'}`,
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: theme.palette.mode === 'dark'
                                            ? '0 16px 40px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(139, 69, 255, 0.3)'
                                            : '0 16px 40px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(139, 69, 255, 0.25)',
                                    },
                                }}
                                onClick={() => navigate("/game-details/" + game.id)}
                            >
                                <Box sx={{
                                    position: 'relative',
                                    aspectRatio: '1 / 1',
                                    overflow: 'hidden',
                                    flexShrink: 0
                                }}>
                                    <CardMedia
                                        component="img"
                                        image={game.cover.url}
                                        alt={game.title}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                                <Box sx={{
                                    p: 2,
                                    minHeight: 80,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    background: theme.palette.mode === 'dark'
                                        ? 'linear-gradient(180deg, rgba(45, 45, 45, 0.9) 0%, rgba(30, 30, 30, 0.95) 100%)'
                                        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 245, 245, 0.95) 100%)',
                                }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            color: theme.palette.text.primary,
                                            textAlign: 'center',
                                            fontSize: '0.875rem',
                                            lineHeight: 1.2,
                                            transition: 'color 0.3s ease',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {game.name}
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mt: 1,
                                        gap: 0.5
                                    }}>
                                        {[...Array(5)].map((_, index) => {
                                            // Rating hesaplama (IGDB'den gelen rating 0-100 arası)
                                            const gameRating = game.rating ? Math.round((game.rating / 100) * 5 * 10) / 10 : 4.0;
                                            const fullStars = Math.floor(gameRating);
                                            const hasHalfStar = gameRating % 1 >= 0.5;

                                            return (
                                                <StarIcon
                                                    key={index}
                                                    sx={{
                                                        fontSize: 12,
                                                        color: index < fullStars || (index === fullStars && hasHalfStar)
                                                            ? '#ffd700'
                                                            : theme.palette.action.disabled,
                                                    }}
                                                />
                                            );
                                        })}
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                ml: 0.5,
                                                color: theme.palette.text.secondary,
                                                fontWeight: 500
                                            }}
                                        >
                                            {game.rating ? (Math.round((game.rating / 100) * 5 * 10) / 10).toFixed(1) : '4.0'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default FavGamesList