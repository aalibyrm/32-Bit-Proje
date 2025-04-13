// src/components/LobbyPanel.jsx
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const lobbies = [
    { name: 'Mines Battle', players: '3/5' },
    { name: 'Crash Room Alpha', players: '5/5' },
    { name: 'Roulette Pro', players: '2/5' },
];

export default function LobbyPanel() {
    return (
        <Box p={2}>
            <Typography variant="h6" gutterBottom>
                Lobiler
            </Typography>
            <List>
                {lobbies.map((room, i) => (
                    <ListItem key={i} button>
                        <ListItemIcon>
                            <SportsEsportsIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={room.name}
                            secondary={`${room.players} Oyuncu`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
