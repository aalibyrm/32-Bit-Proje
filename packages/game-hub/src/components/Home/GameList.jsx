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
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
                p: 3,
                borderRadius: 3,
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(45, 45, 45, 0.6) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.6) 100%)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(139, 69, 255, 0.1)' : 'rgba(139, 69, 255, 0.08)'}`,
                boxShadow: theme.palette.mode === 'dark'
                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                    : '0 8px 32px rgba(0, 0, 0, 0.08)',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #8b45ff 30%, #ff0096 90%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: theme.palette.mode === 'dark' ? '0 2px 4px rgba(139, 69, 255, 0.3)' : 'none',
                        }}
                    >
                        🎮 Oyunlar
                    </Typography>
                    <Button
                        startIcon={<StarIcon />}
                        sx={{
                            background: 'linear-gradient(45deg, #ff9500 30%, #ffb347 90%)',
                            color: 'white',
                            borderRadius: 25,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            py: 1,
                            boxShadow: '0 4px 16px rgba(255, 149, 0, 0.4)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #ff7700 30%, #ff9933 90%)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(255, 149, 0, 0.6)',
                            },
                        }}
                        onClick={() => navigate("/fav-games")}
                    >
                        Favoriler
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Button
                        variant="contained"
                        sx={{
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(45deg, #2d2d2d 30%, #404040 90%)'
                                : 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                            color: 'white',
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 20,
                            px: 3,
                            py: 1,
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 4px 16px rgba(45, 45, 45, 0.4)'
                                : '0 4px 16px rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 6px 20px rgba(45, 45, 45, 0.6)'
                                    : '0 6px 20px rgba(102, 126, 234, 0.5)',
                            },
                        }}
                        onClick={() => navigate("/all-games")}
                    >
                        Tümünü gör
                    </Button>
                    <IconButton
                        sx={{
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(45deg, #404040 30%, #2d2d2d 90%)'
                                : 'linear-gradient(45deg, #e2e8f0 30%, #cbd5e0 90%)',
                            color: theme.palette.mode === 'dark' ? 'white' : '#4a5568',
                            width: 44,
                            height: 44,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(139, 69, 255, 0.3)',
                            },
                            '&:disabled': {
                                opacity: 0.3,
                            }
                        }}
                        disabled={currentPage === 0}
                        onClick={handlePrevPage}
                    >
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                    <Avatar sx={{
                        background: 'linear-gradient(45deg, #8b45ff 30%, #ff0096 90%)',
                        width: 44,
                        height: 44,
                        fontSize: 16,
                        fontWeight: 700,
                        boxShadow: '0 4px 16px rgba(139, 69, 255, 0.4)',
                    }}>
                        {currentPage + 1}
                    </Avatar>
                    <IconButton
                        sx={{
                            background: 'linear-gradient(45deg, #8b45ff 30%, #ff0096 90%)',
                            color: 'white',
                            width: 44,
                            height: 44,
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 16px rgba(139, 69, 255, 0.4)',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(139, 69, 255, 0.6)',
                            },
                            '&:disabled': {
                                opacity: 0.3,
                                background: theme.palette.mode === 'dark' ? '#404040' : '#e2e8f0',
                            }
                        }}
                        disabled={currentPage === maxPage}
                        onClick={handleNextPage}
                    >
                        <ArrowForwardIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {paginatedGames.map((game) => {
                    // Rating hesaplama (IGDB'den gelen rating 0-100 arası, biz 0-5 yıldıza çeviriyoruz)
                    const gameRating = game.rating ? Math.round((game.rating / 100) * 5 * 10) / 10 : 4.0;
                    const fullStars = Math.floor(gameRating);
                    const hasHalfStar = gameRating % 1 >= 0.5;

                    return (
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
                                        className="game-image"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
                                        className="game-title"
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
                                        {[...Array(5)].map((_, index) => (
                                            <StarIcon
                                                key={index}
                                                sx={{
                                                    fontSize: 12,
                                                    color: index < fullStars || (index === fullStars && hasHalfStar)
                                                        ? '#ffd700'
                                                        : theme.palette.action.disabled,
                                                }}
                                            />
                                        ))}
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                ml: 0.5,
                                                color: theme.palette.text.secondary,
                                                fontWeight: 500
                                            }}
                                        >
                                            {gameRating.toFixed(1)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
