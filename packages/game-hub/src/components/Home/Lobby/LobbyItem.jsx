import { Box, Typography, Button, Card, CardContent, Chip, Avatar, Badge, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Countdown from '../Countdown';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PeopleIcon from '@mui/icons-material/People';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import CrownIcon from './CrownIcon';
import socket from '../../../socket/socket';

export default function LobbyItem({ lobby, userId, handleLobbyClick, leaveLobby, requestJoin, deleteLobby }) {
    const navigate = useNavigate();
    const isUserInLobby = lobby.players.includes(userId);
    const isFull = lobby.players.length === lobby.maxPlayers;
    const isLeader = lobby.leader === userId;
    const hasPassword = lobby.password && lobby.password.trim() !== '';
    const isEvent = lobby.type === 'etkinlik';

    // Etkinlik tarihi kontrol fonksiyonu
    const isEventTimeReached = () => {
        if (!isEvent || !lobby.startTime) return true;
        const now = new Date();
        const eventStartTime = new Date(lobby.startTime);
        return now >= eventStartTime;
    };

    const startGame = () => {
        // Sadece Tombala oyunu için şimdilik
        if (lobby.game === "Tombala") {
            // Önce lobideki tüm oyunculara bildirim gönder
            socket.emit('start-game', { lobbyId: lobby.id, game: lobby.game });

            // Kendisi de oyun sayfasına git
            navigate(`/tombala/${lobby.id}`);
        } else {
            // Diğer oyunlar henüz desteklenmiyor
            alert("Bu oyun henüz desteklenmiyor!");
        }
    };

    return (
        <Card
            onClick={() => handleLobbyClick(lobby)}
            sx={{
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                background: isEvent
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : isUserInLobby
                        ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                        : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%, #4facfe 200%)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 0,
                },
                minHeight: 200,
                mt: 2,
                mb: 1,
            }}
        >
            {/* Status Badges */}
            <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2, display: 'flex', gap: 1 }}>
                {isEvent && (
                    <Chip
                        icon={<EventIcon />}
                        label="ETKİNLİK"
                        size="small"
                        sx={{
                            background: 'rgba(255,255,255,0.9)',
                            color: '#667eea',
                            fontWeight: 'bold',
                            animation: 'pulse 2s infinite',
                            '@keyframes pulse': {
                                '0%': { opacity: 1 },
                                '50%': { opacity: 0.7 },
                                '100%': { opacity: 1 },
                            }
                        }}
                    />
                )}
                {hasPassword && (
                    <Chip
                        icon={<LockIcon />}
                        label="ŞİFRELİ"
                        size="small"
                        sx={{
                            background: 'rgba(255,193,7,0.9)',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    />
                )}
                {lobby.gameStarted && (
                    <Chip
                        label="BAŞLADI"
                        size="small"
                        sx={{
                            background: 'rgba(244,67,54,0.9)',
                            color: 'white',
                            fontWeight: 'bold',
                            animation: 'blink 1s infinite',
                            '@keyframes blink': {
                                '0%': { opacity: 1 },
                                '50%': { opacity: 0.5 },
                                '100%': { opacity: 1 },
                            }
                        }}
                    />
                )}
            </Box>

            <CardContent sx={{ position: 'relative', zIndex: 1, color: 'white', height: '100%' }}>
                {/* Header */}
                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                            color: 'white',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            mb: 1
                        }}
                    >
                        {lobby.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CrownIcon sx={{ color: '#FFD700' }} />
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                                {lobby.leader}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <SportsEsportsIcon sx={{ color: 'rgba(255,255,255,0.8)' }} />
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                                {lobby.game}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Player Count */}
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PeopleIcon sx={{ color: 'rgba(255,255,255,0.8)' }} />
                            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                                Oyuncular
                            </Typography>
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                color: isFull ? '#ff4444' : '#4CAF50',
                                fontWeight: 'bold',
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                            }}
                        >
                            {lobby.players.length} / {lobby.maxPlayers}
                        </Typography>
                    </Box>
                </Box>

                {/* Countdown for Events */}
                {lobby.startTime && (
                    <Box sx={{ mb: 2 }}>
                        <Countdown date={lobby.startTime} />
                    </Box>
                )}

                {/* Action Buttons */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 'auto',
                    pt: 2,
                    gap: 1,
                }}>
                    {/* Sol: Ayrıl/Katıl Butonu */}
                    <Box sx={{ flex: '0 0 auto' }}>
                        {isUserInLobby ? (
                            <Button
                                variant="contained"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    leaveLobby(lobby.id);
                                }}
                                sx={{
                                    background: 'rgba(244,67,54,0.9)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderRadius: 3,
                                    px: 3,
                                    py: 1,
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    '&:hover': {
                                        background: 'rgba(244,67,54,1)',
                                        transform: 'scale(1.05)',
                                    }
                                }}
                            >
                                Ayrıl
                            </Button>
                        ) : isFull ? (
                            <Chip
                                label="DOLU"
                                sx={{
                                    background: 'rgba(158,158,158,0.9)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.875rem',
                                    px: 2
                                }}
                            />
                        ) : lobby.gameStarted ? (
                            <Chip
                                label="OYUN BAŞLADI"
                                sx={{
                                    background: 'rgba(244,67,54,0.9)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.875rem',
                                    animation: 'blink 1s infinite',
                                }}
                            />
                        ) : (
                            <Button
                                variant="contained"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    requestJoin(lobby);
                                }}
                                sx={{
                                    background: 'rgba(76,175,80,0.9)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderRadius: 3,
                                    px: 3,
                                    py: 1,
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    '&:hover': {
                                        background: 'rgba(76,175,80,1)',
                                        transform: 'scale(1.05)',
                                    }
                                }}
                            >
                                Katıl
                            </Button>
                        )}
                    </Box>

                    {/* Orta: Silme Butonu (sadece lider için) */}
                    <Box sx={{ flex: '0 0 auto' }}>
                        {isLeader && (
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteLobby(lobby.id);
                                }}
                                sx={{
                                    background: 'rgba(244,67,54,0.9)',
                                    color: 'white',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    '&:hover': {
                                        background: 'rgba(244,67,54,1)',
                                        transform: 'scale(1.1)',
                                    }
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>

                    {/* Sağ: Başlat Butonu (sadece lider için ve etkinlik zamanı gelmiş ise) */}
                    <Box sx={{ flex: '0 0 auto' }}>
                        {isLeader && isEventTimeReached() && (
                            <Button
                                variant="contained"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    startGame();
                                }}
                                startIcon={<PlayArrowIcon />}
                                sx={{
                                    background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderRadius: 3,
                                    px: 2,
                                    py: 1,
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    fontSize: '0.875rem',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                                        transform: 'scale(1.05)',
                                        filter: 'brightness(1.1)',
                                    }
                                }}
                            >
                                Başlat
                            </Button>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
