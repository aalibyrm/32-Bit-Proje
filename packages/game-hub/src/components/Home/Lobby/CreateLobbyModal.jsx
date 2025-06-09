// LobbyPanel/components/CreateLobbyModal.jsx
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Modal, Autocomplete } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const gameOptions = [
    { label: 'Tombala', value: 'Tombala' },
    { label: 'Satranç', value: 'Satranc' },
    { label: 'Mangala', value: 'Mangala' },
    { label: 'UNO', value: 'UNO' },
    { label: 'Tavla', value: 'Tavla' },
    { label: 'Okey', value: 'Okey' },
    { label: 'King', value: 'King' },
    { label: 'Batak', value: 'Batak' }
];

export default function CreateLobbyModal({ open, handleClose, newLobby, setNewLobby, createLobby }) {
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
                <Typography variant="h6" gutterBottom>Yeni Lobi Oluştur</Typography>

                <TextField
                    fullWidth margin="normal" label="Lobi Adı"
                    value={newLobby.name}
                    onChange={(e) => setNewLobby({ ...newLobby, name: e.target.value })}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                        }
                    }}
                />

                <TextField
                    fullWidth margin="normal" label="Şifre" type="password"
                    value={newLobby.password}
                    onChange={(e) => setNewLobby({ ...newLobby, password: e.target.value })}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                        }
                    }}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="type-label">Lobi Türü</InputLabel>
                    <Select
                        labelId="type-label"
                        value={newLobby.type}
                        label="Lobi Türü"
                        onChange={(e) => setNewLobby({ ...newLobby, type: e.target.value })}
                        sx={{
                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: (theme) => theme.palette.divider,
                            }
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                                    '& .MuiMenuItem-root': {
                                        bgcolor: 'transparent',
                                        '&:hover': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                        }
                                    }
                                }
                            }
                        }}
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
                                    sx: {
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                        }
                                    }
                                },
                                popper: {
                                    sx: {
                                        '& .MuiPaper-root': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                                            border: (theme) => `1px solid ${theme.palette.divider}`,
                                        },
                                        '& .MuiPickersCalendarHeader-root': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                        },
                                        '& .MuiDayCalendar-header': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                        },
                                        '& .MuiPickersDay-root': {
                                            bgcolor: 'transparent',
                                            '&:hover': {
                                                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                            }
                                        },
                                        '& .MuiTimeClock-root': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                                        },
                                        '& .MuiMultiSectionDigitalClock-root': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                                        },
                                        '& .MuiMenuItem-root': {
                                            bgcolor: 'transparent',
                                            '&:hover': {
                                                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                            }
                                        }
                                    }
                                }
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
                                    sx: {
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                        }
                                    }
                                },
                                popper: {
                                    sx: {
                                        '& .MuiPaper-root': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                                            border: (theme) => `1px solid ${theme.palette.divider}`,
                                        },
                                        '& .MuiPickersCalendarHeader-root': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                        },
                                        '& .MuiDayCalendar-header': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                        },
                                        '& .MuiPickersDay-root': {
                                            bgcolor: 'transparent',
                                            '&:hover': {
                                                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                            }
                                        },
                                        '& .MuiTimeClock-root': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                                        },
                                        '& .MuiMultiSectionDigitalClock-root': {
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                                        },
                                        '& .MuiMenuItem-root': {
                                            bgcolor: 'transparent',
                                            '&:hover': {
                                                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </LocalizationProvider>
                )}

                <Autocomplete
                    fullWidth
                    options={gameOptions}
                    getOptionLabel={(option) => option.label}
                    value={gameOptions.find(option => option.value === newLobby.game) || null}
                    onChange={(event, newValue) => {
                        setNewLobby({ ...newLobby, game: newValue ? newValue.value : '' });
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Oyun Seçin"
                            margin="normal"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE',
                                }
                            }}
                        />
                    )}
                    PaperComponent={({ children, ...other }) => (
                        <Box
                            {...other}
                            sx={{
                                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2A2A2A' : '#F5F5F5',
                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                '& .MuiAutocomplete-option': {
                                    bgcolor: 'transparent !important',
                                    '&:hover': {
                                        bgcolor: (theme) => `${theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE'} !important`,
                                    },
                                    '&[aria-selected="true"]': {
                                        bgcolor: (theme) => `${theme.palette.mode === 'dark' ? '#1A1A1A' : '#EEEEEE'} !important`,
                                    }
                                }
                            }}
                        >
                            {children}
                        </Box>
                    )}
                />

                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="outlined" color="error" onClick={handleClose}>İptal</Button>
                    <Button variant="contained" onClick={createLobby}>Oluştur</Button>
                </Box>
            </Box>
        </Modal>
    );
}
