import {
    Box,
    Typography,
    Button,
    IconButton,
    Avatar,
    Grid,
    Card,
    CardMedia,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { useGames } from '../../games/GameContext';
import { useNavigate } from 'react-router-dom'



export default function GameSection() {
    const theme = useTheme();
    const { games, loading, error } = useGames();
    const navigate = useNavigate();

    const gamesPerPage = 12;
    const maxPage = Math.ceil(games.length / gamesPerPage) - 1;
    const [currentPage, setCurrentPage] = useState(0);

    const handleNextPage = () => {
        if (currentPage < maxPage) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    const paginatedGames = games.slice(
        currentPage * gamesPerPage,
        (currentPage + 1) * gamesPerPage
    );

    console.log(games);

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" color="text.primary" sx={{ mr: 2 }}>
                        Oyunlar
                    </Typography>
                    <Button
                        startIcon={<StarIcon />}
                        sx={{
                            backgroundColor: '#E5A000',
                            color: 'white',
                            borderRadius: 5,
                            textTransform: 'none',
                            '&:hover': { backgroundColor: '#f39c12' },
                        }}
                    >
                        Favoriler
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1c1c1c',
                            color: 'white',
                            textTransform: 'none',
                            borderRadius: 8,
                            px: 2,
                            '&:hover': { backgroundColor: '#333' },
                        }}
                    >
                        Tümünü gör
                    </Button>
                    <IconButton
                        sx={{ backgroundColor: '#2d2d2d', color: 'white' }}
                        disabled={currentPage === 0}
                        onClick={handlePrevPage}
                    >
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                    <Avatar sx={{ bgcolor: '#3a3a3a', width: 36, height: 36, fontSize: 18 }}>
                        {currentPage + 1}
                    </Avatar>
                    <IconButton
                        sx={{ backgroundColor: '#b44fff', color: 'white' }}
                        disabled={currentPage === maxPage}
                        onClick={handleNextPage}
                    >
                        <ArrowForwardIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            <Grid container spacing={2}>
                {paginatedGames.map((game) => (
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
    );
}
