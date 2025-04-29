// LobbyPanel/components/LobbyList.jsx
import { Box, Typography } from '@mui/material';
import LobbyItem from './LobbyItem';

export default function LobbyList({ lobbies, userId, handleLobbyClick, leaveLobby, requestJoin, deleteLobby }) {
    return (
        <Box mt={4}>
            <Typography variant="h6" color="text.primary">Mevcut Lobiler</Typography>
            {lobbies.length === 0 ? (
                <Typography>Hiç lobi yok.</Typography>
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
