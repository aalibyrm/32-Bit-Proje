import { Box, Button, Modal, TextField } from '@mui/material';

export default function JoinLobbyModal({ open, handleClose, inputId, setInputId, checkLobbyId }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 400, bgcolor: 'background.paper', color: 'text.primary', boxShadow: 24, p: 4, borderRadius: 2
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
