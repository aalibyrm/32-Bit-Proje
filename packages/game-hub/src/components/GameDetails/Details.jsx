import { Box, Button, Card, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../Home/Navbar'
import { lobbies } from '../../../server/lobby'

const Details = ({ game }) => {

    console.log("gameeeee", game)



    const filteredLobbies = lobbies.filter(lobby => lobby.game === game.name);

    console.log("filtere", filteredLobbies)

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

                <Box sx={{ zIndex: 2 }}>
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

        </Box>
    )
}

export default Details