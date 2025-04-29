import { Box, Chip, Typography, useTheme } from '@mui/material'
import React from 'react'

function PlayerList({ players, leader }) {

    const theme = useTheme();
    const mode = theme.palette.mode === 'light';

    return (
        <Box sx={{
            maxHeight: '350px',
            overflowY: 'auto',
            pr: 1,
            '&::-webkit-scrollbar': {
                width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.divider,
                borderRadius: '3px',
            },
        }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Lobideki Oyuncular</Typography>
            {players.map((player, index) => {
                const isLeader = player === leader;

                return (
                    <Box key={index} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: 'background.default'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box>
                                <Typography >{player}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {isLeader ? 'Lobi Lideri' : 'Üye'}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chip label="Aktif" sx={{
                                    color: mode ? '#059669' : '#D1FAE5',
                                    backgroundColor: mode ? '#D1FAE5' : '#059669',
                                }}
                                    variant="contained" />
                            </Box>
                        </Box>
                    </Box>
                )
            })}
        </Box >
    )
}

export default PlayerList