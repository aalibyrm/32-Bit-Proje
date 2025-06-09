import { Box, Chip, Typography, useTheme } from '@mui/material'
import React from 'react'

function PlayerList({ players, leader }) {

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

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
            <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.primary' }}>Lobideki Oyuncular</Typography>
            {players.map((player, index) => {
                const isLeader = player === leader;

                return (
                    <Box key={index} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1.5,
                        mb: 1,
                        borderRadius: 2,
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.2s ease'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box>
                                <Typography sx={{ color: 'text.primary', fontWeight: 600 }}>{player}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {isLeader ? 'Lobi Lideri' : 'Üye'}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chip label="Aktif" sx={{
                                    color: isDark ? '#D1FAE5' : '#059669',
                                    backgroundColor: isDark ? '#059669' : '#D1FAE5',
                                    fontWeight: 600,
                                    border: isDark ? '1px solid #059669' : '1px solid #D1FAE5'
                                }}
                                    variant="filled" />
                            </Box>
                        </Box>
                    </Box>
                )
            })}
        </Box >
    )
}

export default PlayerList