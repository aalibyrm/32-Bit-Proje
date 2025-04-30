// LobbyPanel/components/CreateLobbyModal.jsx
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Modal } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function CreateLobbyModal({ open, handleClose, newLobby, setNewLobby, createLobby }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 400, bgcolor: 'background.paper', color: 'text.primary', boxShadow: 24, p: 4, borderRadius: 2
            }}>
                <Typography variant="h6" gutterBottom>Yeni Lobi Oluştur</Typography>

                <TextField
                    fullWidth margin="normal" label="Lobi Adı"
                    value={newLobby.name}
                    onChange={(e) => setNewLobby({ ...newLobby, name: e.target.value })}
                />

                <TextField
                    fullWidth margin="normal" label="Şifre" type="password"
                    value={newLobby.password}
                    onChange={(e) => setNewLobby({ ...newLobby, password: e.target.value })}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="type-label">Lobi Türü</InputLabel>
                    <Select
                        labelId="type-label"
                        value={newLobby.type}
                        label="Lobi Türü"
                        onChange={(e) => setNewLobby({ ...newLobby, type: e.target.value })}
                    >
                        <MenuItem value="normal">Normal</MenuItem>
                        <MenuItem value="etkinlik">Etkinlik</MenuItem>
                    </Select>
                </FormControl>

                {newLobby.type === "etkinlik" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Etkinlik Tarih ve Saati"
                            ampm={false}
                            value={newLobby.eventStartDateTime ? dayjs(newLobby.eventStartDateTime) : null}
                            onChange={(newValue) => {
                                setNewLobby({
                                    ...newLobby,
                                    eventStartDateTime: newValue ? newValue.toISOString() : null,
                                    eventEndDateTime: newValue && newLobby.eventEndDateTime && dayjs(newLobby.eventEndDateTime).isBefore(newValue)
                                        ? null
                                        : newLobby.eventEndDateTime
                                });
                            }}
                            minDateTime={dayjs()}
                            slots={{
                                textField: TextField,
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: 'normal',
                                },
                            }}
                        />

                        <DateTimePicker
                            label="Bitiş Tarih ve Saati"
                            ampm={false}
                            value={newLobby.eventEndDateTime ? dayjs(newLobby.eventEndDateTime) : null}
                            onChange={(newValue) => {
                                setNewLobby({
                                    ...newLobby,
                                    eventEndDateTime: newValue ? newValue.toISOString() : null
                                });
                            }}
                            minDateTime={
                                newLobby.eventStartDateTime
                                    ? dayjs(newLobby.eventStartDateTime)
                                    : dayjs()
                            }
                            slots={{
                                textField: TextField,
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: 'normal',
                                },
                            }}
                        />
                    </LocalizationProvider>
                )}

                <FormControl fullWidth margin="normal">
                    <InputLabel id="game-label">Oyun</InputLabel>
                    <Select
                        labelId="game-label"
                        value={newLobby.game}
                        label="Oyun"
                        onChange={(e) => setNewLobby({ ...newLobby, game: e.target.value })}
                    >
                        <MenuItem value="Tombala">Tombala</MenuItem>
                        <MenuItem value="Satranc">Satranç</MenuItem>
                        <MenuItem value="Mangala">Mangala</MenuItem>
                        <MenuItem value="UNO">UNO</MenuItem>
                    </Select>
                </FormControl>

                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="outlined" color="error" onClick={handleClose}>İptal</Button>
                    <Button variant="contained" onClick={createLobby}>Oluştur</Button>

                </Box>
            </Box>
        </Modal>
    );
}
