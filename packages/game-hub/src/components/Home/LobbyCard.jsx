/* import { Box, Typography, Button, Card, CardContent, CardActions, Chip } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';

function LobbyCard({ lobby, isJoined, onJoin, onLeave, onDelete, isLeader }) {
    const isFull = lobby.players.length >= (lobby.maxPlayers || 8);

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                p: 0.5,
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 180,
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight="bold">
                        {lobby.name}
                    </Typography>
                    <Chip
                        icon={<GroupIcon />}
                        label={`${lobby.players.length}/${lobby.maxPlayers || 8}`}
                        size="small"
                        color={isFull ? "error" : "primary"}
                    />
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <SportsEsportsIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                        {lobby.game}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <EventIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                        {lobby.type === 'etkinlik' ? "Etkinlik" : "Normal"}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between', mt: 2 }}>
                {isJoined ? (
                    <Button variant="outlined" size="small" color="primary" onClick={() => onLeave(lobby.id)}>
                        Ayrıl
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        size="small"
                        color={isFull ? "inherit" : "primary"}
                        disabled={isFull}
                        onClick={() => onJoin(lobby)}
                    >
                        {isFull ? "Dolu" : "Katıl"}
                    </Button>
                )}

                {isLeader && (
                    <Button variant="text" size="small" color="error" onClick={() => onDelete(lobby.id)}>
                        <DeleteIcon />
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default LobbyCard;
 */