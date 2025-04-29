import { Box, Typography, Button, Card, CardContent, Chip, Avatar } from '@mui/material';
import Countdown from '../Countdown';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CrownIcon from './CrownIcon';


export default function LobbyItem({ lobby, userId, handleLobbyClick, leaveLobby, requestJoin, deleteLobby }) {

    const isFull = lobby.players.length === lobby.maxPlayers;

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                p: 0.5,
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 180,
                mt: 1,
                mb: 1,
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1.5,
                    }}
                >
                    <Typography
                        onClick={() => handleLobbyClick(lobby)}
                        color="text.primary"
                        sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {lobby.name}
                    </Typography>

                    <Typography
                        variant="subtitle2"
                        color={isFull ? 'error' : 'text.secondary'}
                    >
                        {lobby.players.length} / {lobby.maxPlayers}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CrownIcon />

                    <Typography variant="body2" color="text.secondary">
                        {lobby.leader}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <SportsEsportsIcon sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {lobby.game}
                    </Typography>
                </Box>

                {lobby.startTime && (
                    <Box sx={{ mb: 2 }}>
                        <Countdown date={lobby.startTime} />
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    {lobby.players.includes(userId) ? (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => leaveLobby(lobby.id)}
                            sx={{ px: 3 }}
                        >
                            Ayrıl
                        </Button>
                    ) : isFull ? (
                        <Typography sx={{ mt: 1 }}>Dolu</Typography>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => requestJoin(lobby)}
                            sx={{ px: 3 }}
                        >
                            Katıl
                        </Button>
                    )}

                    {lobby.leader === userId && (
                        <Button
                            variant="text"
                            color="error"
                            onClick={() => deleteLobby(lobby.id)}
                        >
                            <DeleteIcon />
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>

    );
}
