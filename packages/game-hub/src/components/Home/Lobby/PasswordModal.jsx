import { Box, Button, Modal, TextField, Typography } from '@mui/material';

export default function PasswordModal({ open, handleClose, joinPassword, setJoinPassword, submitJoin, error }) {
    return (
        <Modal open={Boolean(open)} onClose={handleClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 400, bgcolor: 'background.paper', color: 'text.primary', boxShadow: 24, p: 4, borderRadius: 2
            }}>
                <Typography variant="h6" gutterBottom>🔐 Şifre Gerekli</Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Lobi Şifresi"
                    type="password"
                    value={joinPassword}
                    onChange={(e) => setJoinPassword(e.target.value)}
                />

                {error && (
                    <Typography color="error" mt={1}>
                        {error}
                    </Typography>
                )}

                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        onClick={submitJoin}
                    >
                        Katıl
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
