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

const allGames = [
    { title: 'Tombala', img: 'https://placehold.co/80x80?text=Tombala', desc: 'Hızlı oyun, büyük ödül!' },
    { title: 'Satranç', img: 'https://placehold.co/80x80?text=Satranç', desc: 'Zeka savaşları!' },
    { title: 'Mangala', img: 'https://placehold.co/80x80?text=Mangala', desc: 'Strateji ve hız!' },
    { title: 'Zuma', img: 'https://placehold.co/80x80?text=Zuma', desc: 'Strateji ve hız!' },
    { title: 'Uno', img: 'https://placehold.co/80x80?text=Uno', desc: 'Strateji ve hız!' },
    { title: 'Uno', img: 'https://placehold.co/80x80?text=Uno', desc: 'Strateji ve hız!' },
    { title: 'Tombala', img: 'https://placehold.co/80x80?text=Tombala', desc: 'Hızlı oyun, büyük ödül!' },
    { title: 'Satranç', img: 'https://placehold.co/80x80?text=Satranç', desc: 'Zeka savaşları!' },
    { title: 'Mangala', img: 'https://placehold.co/80x80?text=Mangala', desc: 'Strateji ve hız!' },
    { title: 'Zuma', img: 'https://placehold.co/80x80?text=Zuma', desc: 'Strateji ve hız!' },
    { title: 'Uno', img: 'https://placehold.co/80x80?text=Uno', desc: 'Strateji ve hız!' },
    { title: 'Uno', img: 'https://placehold.co/80x80?text=Uno', desc: 'Strateji ve hız!' }, { title: 'Uno', img: 'https://placehold.co/80x80?text=Uno', desc: 'Strateji ve hız!' }, { title: 'Uno', img: 'https://placehold.co/80x80?text=Uno', desc: 'Strateji ve hız!' },
];

export default function GameSection() {
    const theme = useTheme();
    const gamesPerPage = 12;
    const maxPage = Math.ceil(allGames.length / gamesPerPage) - 1;
    const [currentPage, setCurrentPage] = useState(0);

    const handleNextPage = () => {
        if (currentPage < maxPage) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    const paginatedGames = allGames.slice(
        currentPage * gamesPerPage,
        (currentPage + 1) * gamesPerPage
    );

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
                {paginatedGames.map((game, idx) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={idx}>
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
                            >
                                <CardMedia
                                    component="img"
                                    image={game.img}
                                    alt={game.title}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Card>
                            <Typography variant="subtitle1" fontWeight="bold" mt={1} color="text.primary">
                                {game.title}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
