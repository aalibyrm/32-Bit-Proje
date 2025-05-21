import { Box, Button, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import { lobbies } from '../../../server/lobby'
import StarIcon from '@mui/icons-material/Star';


const Details = ({ game }) => {
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
                    borderRadius: 2,
                    minHeight: '325px',
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
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ marginBottom: 1 }}>
                        {game.name}
                    </Typography>
                </Box>

                <Box sx={{ zIndex: 2, display: 'flex', gap: 2 }}>
                    <Button
                        onClick={isFav ? delFav : addFav}
                        variant="outlined"
                        startIcon={<StarIcon />}
                        sx={{
                            backgroundColor: '#E5A000',
                            color: 'white',
                            borderRadius: '2rem',
                            px: 2,
                            py: 0.8,
                            textTransform: 'none',
                            '&:hover': { backgroundColor: '#f39c12' },


                        }}
                    >
                        {isFav ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#2ecc71',
                            color: 'white',
                            borderRadius: '2rem',
                            px: 4,
                            py: 1.2,
                            fontSize: '1.2rem',
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

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginTop: 2,
                width: '100%',

            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '50%'
                }}>
                    <Typography variant="subtitle1" gutterBottom>Oyun Açıklaması</Typography>

                    <Typography
                        variant="body1"
                        gutterBottom
                        sx={{
                            width: '100%',
                            maxWidth: '100%',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            textAlign: 'left',
                            whiteSpace: 'pre-line'
                        }}
                    >
                        {game.summary}
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', width: '50%',
                }}>
                    <Typography variant="subtitle1" gutterBottom>Lobiler</Typography>

                    {
                        filteredLobbies.length > 0 ? (
                            filteredLobbies.map(lobby => (
                                <Box key={lobby.id}>
                                    {lobby.name} {/* Lobi detayları */}
                                </Box>
                            ))
                        ) : (
                            <Typography color="textSecondary">Lobi yok</Typography>
                        )
                    }

                </Box>

            </Box>

        </Box >
    )
}

export default Details