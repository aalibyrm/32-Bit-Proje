import { Box, Button, Modal, TextField, Typography } from '@mui/material';

export default function PasswordModal({ open, handleClose, joinPassword, setJoinPassword, submitJoin, error }) {
    return (
        <Modal open={Boolean(open)} onClose={handleClose}>
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
