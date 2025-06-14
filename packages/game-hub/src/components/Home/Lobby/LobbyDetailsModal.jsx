import { Close } from '@mui/icons-material';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import PlayerList from './PlayerList';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


export default function LobbyDetailsModal({ open, handleClose, selectedLobby, showAlert }) {
    if (!selectedLobby) return null;

    const handleCopyId = () => {
        navigator.clipboard.writeText(selectedLobby.id);
        showAlert('Kod kopyalandı!', 'success');
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                color: 'text.primary',
                boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 24px 48px rgba(158, 35, 222, 0.2)'
                    : '0 24px 48px rgba(141, 23, 24, 0.2)',
                p: 1.5,
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                backdropFilter: 'blur(10px)'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" gutterBottom>Lobi Detayları</Typography>
                    <Close fontSize='medium' onClick={handleClose} sx={{ cursor: 'pointer' }} />
                </Box>
                <Divider sx={{ width: '100%', mb: 2 }} />

                <Box sx={{ display: 'flex', p: 1, mb: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE', borderRadius: 2, justifyContent: 'space-between' }}>
                    <Typography >Lobi ID:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{selectedLobby.id}</Typography>
                        <ContentCopyIcon sx={{ ml: 1, cursor: 'pointer' }} onClick={handleCopyId} />
                    </Box>

                </Box>

                <Box sx={{ display: 'flex', p: 1, mb: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE', borderRadius: 2, justifyContent: 'space-between' }}>
                    <Typography>Lobi Adı:</Typography>
                    <Typography>{selectedLobby.name}</Typography>
                </Box>

                <Box sx={{ display: 'flex', p: 1, mb: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE', borderRadius: 2, justifyContent: 'space-between' }}>
                    <Typography>Kurucu:</Typography>
                    <Typography>{selectedLobby.leader}</Typography>
                </Box>

                <Box sx={{ display: 'flex', p: 1, mb: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE', borderRadius: 2, justifyContent: 'space-between' }}>
                    <Typography>Oyun:</Typography>
                    <Typography>{selectedLobby.game}</Typography>
                </Box>

                <Box sx={{ display: 'flex', p: 1, mb: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE', borderRadius: 2, justifyContent: 'space-between' }}>
                    <Typography >Lobi Türü:</Typography>
                    <Typography>{selectedLobby.type}</Typography>
                </Box>

                <Box sx={{ display: 'flex', p: 1, mb: 1, bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE', borderRadius: 2, justifyContent: 'space-between' }}>
                    <Typography>Oyuncu Sayısı:</Typography>
                    <Typography>{selectedLobby.players.length} / {selectedLobby.maxPlayers}</Typography>
                </Box>
                <Divider sx={{ width: '100%', mt: 2, mb: 1 }} />


                <PlayerList players={selectedLobby.players} leader={selectedLobby.leader} />

            </Box>
        </Modal>
    );
}
