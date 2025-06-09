import { Box, Button, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import { lobbies } from '../../../server/lobby'
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';


const Details = ({ game }) => {
    const theme = useTheme();
    const filteredLobbies = lobbies.filter(lobby => lobby.game === game.name);

    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favoriteGames")) || [];
        setIsFav(favs.includes(game.name));
    }, [game.name])

    const addFav = () => {
        const favs = JSON.parse(localStorage.getItem("favoriteGames")) || [];
        if (!favs.includes(game.name)) {
            favs.push(game.name);
            localStorage.setItem("favoriteGames", JSON.stringify(favs));
            setIsFav(true);
        }
    }

    const delFav = () => {
        let favs = JSON.parse(localStorage.getItem("favoriteGames")) || []
        favs = favs.filter(name => name !== game.name);
        localStorage.setItem("favoriteGames", JSON.stringify(favs));
        setIsFav(false);
    }

    return (
        <Box>
            <Box
                sx={{
                    backgroundImage: `url(${game.screenshots[0].url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    p: 4,
                    borderRadius: '16px',
                    minHeight: '325px',
                    color: 'white',
                    position: 'relative',
                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
                    boxShadow: `0 8px 32px ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.2)' : 'rgba(141, 23, 24, 0.2)'}`,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '16px',
                        zIndex: 1,
                    }}
                />

                <Box sx={{ zIndex: 2, maxWidth: '60%' }}>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                            marginBottom: 1,
                            color: 'white',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                        }}
                    >
                        {game.name}
                    </Typography>
                </Box>

                <Box sx={{ zIndex: 2, display: 'flex', gap: 2 }}>
                    <Button
                        onClick={isFav ? delFav : addFav}
                        variant="outlined"
                        startIcon={<StarIcon />}
                        sx={{
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(255, 107, 107, 0.9), rgba(255, 107, 107, 0.7))'
                                : 'linear-gradient(135deg, rgba(224, 30, 55, 0.9), rgba(185, 26, 28, 0.9))',
                            color: 'white',
                            borderRadius: '2rem',
                            px: 2,
                            py: 0.8,
                            textTransform: 'none',
                            border: 'none',
                            backdropFilter: 'blur(10px)',
                            fontWeight: 'bold',
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 4px 16px rgba(255, 107, 107, 0.3)'
                                : '0 4px 16px rgba(224, 30, 55, 0.3)',
                            '&:hover': {
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(255, 107, 107, 1), rgba(255, 107, 107, 0.8))'
                                    : 'linear-gradient(135deg, rgba(224, 30, 55, 1), rgba(185, 26, 28, 1))',
                                transform: 'translateY(-1px)',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 6px 20px rgba(255, 107, 107, 0.4)'
                                    : '0 6px 20px rgba(224, 30, 55, 0.4)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {isFav ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, rgba(78, 205, 196, 0.9), rgba(78, 205, 196, 0.7))'
                                : 'linear-gradient(135deg, rgba(78, 205, 196, 0.9), rgba(52, 152, 219, 0.9))',
                            color: 'white',
                            borderRadius: '2rem',
                            px: 4,
                            py: 1.2,
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            border: 'none',
                            backdropFilter: 'blur(10px)',
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 4px 16px rgba(78, 205, 196, 0.3)'
                                : '0 4px 16px rgba(78, 205, 196, 0.3)',
                            '&:hover': {
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, rgba(78, 205, 196, 1), rgba(78, 205, 196, 0.8))'
                                    : 'linear-gradient(135deg, rgba(78, 205, 196, 1), rgba(52, 152, 219, 1))',
                                transform: 'translateY(-1px)',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 6px 20px rgba(78, 205, 196, 0.4)'
                                    : '0 6px 20px rgba(78, 205, 196, 0.4)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Oyna
                    </Button>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginTop: 3,
                width: '100%',
                gap: 4,
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '50%'
                }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 'bold',
                            mb: 2
                        }}
                    >
                        Oyun Açıklaması
                    </Typography>

                    <Card
                        sx={{
                            width: '100%',
                            background: theme.palette.background.paper,
                            borderRadius: '16px',
                            p: 3,
                            boxShadow: `0 8px 32px ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.1)' : 'rgba(141, 23, 24, 0.1)'}`,
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.2)' : 'rgba(141, 23, 24, 0.2)'}`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: `0 12px 40px ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.2)' : 'rgba(141, 23, 24, 0.2)'}`,
                            }
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.primary,
                                lineHeight: 1.6,
                                textAlign: 'justify',
                                whiteSpace: 'pre-line'
                            }}
                        >
                            {game.summary}
                        </Typography>
                    </Card>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '50%',
                }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 'bold',
                            mb: 2
                        }}
                    >
                        Aktif Lobiler
                    </Typography>

                    <Card
                        sx={{
                            width: '100%',
                            background: theme.palette.background.paper,
                            borderRadius: '16px',
                            p: 3,
                            boxShadow: `0 8px 32px ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.1)' : 'rgba(141, 23, 24, 0.1)'}`,
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.2)' : 'rgba(141, 23, 24, 0.2)'}`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: `0 12px 40px ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.2)' : 'rgba(141, 23, 24, 0.2)'}`,
                            }
                        }}
                    >
                        {
                            filteredLobbies.length > 0 ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {filteredLobbies.map(lobby => (
                                        <Box
                                            key={lobby.id}
                                            sx={{
                                                p: 2,
                                                borderRadius: '12px',
                                                background: theme.palette.mode === 'dark'
                                                    ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.1), rgba(255, 107, 107, 0.1))'
                                                    : 'linear-gradient(135deg, rgba(141, 23, 24, 0.1), rgba(78, 205, 196, 0.1))',
                                                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.2)' : 'rgba(141, 23, 24, 0.2)'}`,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    background: theme.palette.mode === 'dark'
                                                        ? 'linear-gradient(135deg, rgba(158, 35, 222, 0.2), rgba(255, 107, 107, 0.2))'
                                                        : 'linear-gradient(135deg, rgba(141, 23, 24, 0.2), rgba(78, 205, 196, 0.2))',
                                                    transform: 'translateX(4px)',
                                                }
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight="bold"
                                                sx={{ color: theme.palette.text.primary }}
                                            >
                                                {lobby.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    mt: 0.5
                                                }}
                                            >
                                                Oyuncu Sayısı: {lobby.players?.length || 0}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontStyle: 'italic'
                                        }}
                                    >
                                        Henüz aktif lobi bulunmuyor
                                    </Typography>
                                </Box>
                            )
                        }
                    </Card>
                </Box>
            </Box>
        </Box >
    )
}

export default Details