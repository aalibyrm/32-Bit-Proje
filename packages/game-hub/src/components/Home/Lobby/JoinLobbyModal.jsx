import { Box, Button, Modal, TextField } from '@mui/material';

export default function JoinLobbyModal({ open, handleClose, inputId, setInputId, checkLobbyId }) {
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
                p: 4,
                borderRadius: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                backdropFilter: 'blur(10px)'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        label="Lobi ID"
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        sx={{ ml: 2 }}
                        onClick={() => {
                            checkLobbyId(inputId);
                            handleClose();
                            setInputId('');
                        }}
                    >
                        Katıl
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
