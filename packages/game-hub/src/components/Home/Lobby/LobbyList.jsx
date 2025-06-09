// LobbyPanel/components/LobbyList.jsx
import { Box, Typography } from '@mui/material';
import LobbyItem from './LobbyItem';

export default function LobbyList({ lobbies, userId, handleLobbyClick, leaveLobby, requestJoin, deleteLobby }) {
    return (
        <Box mt={4}>
            <Typography
                variant="h5"
                sx={{
                    color: 'text.primary',
                    fontWeight: 'bold',
                    mb: 2,
                    textAlign: 'center',
                    background: (theme) => theme.palette.gradient.primary,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                Mevcut Lobiler
            </Typography>
            {lobbies.length === 0 ? (
                <Box sx={{
                    textAlign: 'center',
                    py: 4,
                    background: (theme) => theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                    borderRadius: 3,
                    border: (theme) => `1px dashed ${theme.palette.divider}`
                }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'text.secondary',
                            mb: 1,
                            fontWeight: 500
                        }}
                    >
                        🏠 Henüz lobi yok
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        İlk lobiyi sen oluştur ve arkadaşlarını bekle!
                    </Typography>
                </Box>
            ) : (
                lobbies.map((lobby) => (
                    <LobbyItem
                        key={lobby.id}
                        lobby={lobby}
                        userId={userId}
                        handleLobbyClick={handleLobbyClick}
                        leaveLobby={leaveLobby}
                        requestJoin={requestJoin}
                        deleteLobby={deleteLobby}
                    />
                ))
            )}
        </Box>
    );
}
