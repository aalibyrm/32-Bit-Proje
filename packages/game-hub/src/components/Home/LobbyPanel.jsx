import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Modal, Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect, useState } from 'react';
import socket from '../../socket/socket';
import { AlertContext } from '../../alert/AlertContext';
import Countdown from './Countdown';
import { useTheme } from '@mui/material/styles';

export default function LobbyPanel() {

    const theme = useTheme();
    const { showAlert } = useContext(AlertContext);
    const [lobbies, setLobbies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newLobby, setNewLobby] = useState({
        name: '',
        password: '',
        type: 'normal',
        game: '',
        eventStartDateTime: null,
        eventEndDateTime: null
    })

    const [joinPassword, setJoinPassword] = useState('');
    const [selectedLobbyId, setSelectedLobbyId] = useState(null);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);
    const [selectedLobby, setSelectedLobby] = useState(null);
    const [lobbyModalOpen, setLobbyModalOpen] = useState(false);
    const [joinModalOpen, setJoinModalOpen] = useState(false);
    const [inputId, setInputId] = useState('');


    const handleLobbyClick = (lobby) => {
        setSelectedLobby(lobby);
        setLobbyModalOpen(true);
    };

    const handleCloseLobbyModal = () => {
        setLobbyModalOpen(false);
    };

    const handleOpenJoinModal = () => {
        setJoinModalOpen(true);
    };

    const handleCloseJoinModal = () => {
        setJoinModalOpen(false);
    };

    useEffect(() => {
        socket.emit('get-user-id');
        socket.on('user-id', (id) => {
            setUserId(id);
        });

        socket.on('lobbies', (lobbies) => {
            setLobbies(lobbies);
        });
        socket.emit('get-lobbies');

        socket.on('join-success', (lobby) => {
            showAlert('Lobiye katıldınız', 'success');
            setJoinPassword('');
            setSelectedLobbyId(null);
            setError('');
        });

        socket.on('join-error', (msg) => {
            setError(msg);
        });


        return () => {
            socket.off('lobbies');
            socket.off('join-success');
            socket.off('join-error');
            socket.off('user-id');
        };
    }, [])


    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const isInLobby = lobbies.some(lobby => lobby.players.includes(userId));
    const isLeader = lobbies.some(l => l.leader === userId);


    const createLobby = () => {
        if (!newLobby.name.trim()) return;
        socket.emit('create-lobby', { data: newLobby });
        handleClose();
    }

    const requestJoin = (lobby) => {
        setSelectedLobbyId(lobby.id)
    }

    const submitJoin = () => {
        socket.emit('join-lobby', {
            lobbyId: selectedLobbyId,
            password: joinPassword
        });
    };

    const leaveLobby = (id) => {
        socket.emit('leave-lobby', id)
        showAlert('Lobiden ayrıldınız', 'success');
        setSelectedLobbyId(null)
    }

    const deleteLobby = (id) => {
        socket.emit('delete-lobby', id)
        showAlert('Lobi silindi', 'success');

    }

    const sortedLobbies = [...lobbies].sort((a, b) => {
        if (a.type === "etkinlik" && b.type !== "etkinlik") return -1;
        if (a.type !== "etkinlik" && b.type === "etkinlik") return 1;
        return 0;
    });

    const checkLobbyId = (inputId) => {
        if (!inputId.trim()) {
            showAlert('Hatalı ID', 'error');
            return;
        }
        const isLobbyValid = lobbies.some(lobby => lobby.id === inputId);

        if (isLobbyValid) {
            setSelectedLobbyId(inputId);
        } else {
            showAlert('Hatalı ID', 'error');
        }
    };
    return (
        <Box p={2} sx={{
            overflowY: 'auto',
            height: '100%',
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                    !isLeader &&
                    <Button variant="contained" color="primary" onClick={handleOpen} >
                        Lobi Oluştur
                    </Button>
                }

                {
                    !isInLobby &&
                    <Button variant='contained' color='primary' onClick={() => setJoinModalOpen(true)}>
                        Lobiye katıl
                    </Button>
                }
            </Box>

            <Modal open={joinModalOpen} onClose={handleCloseJoinModal}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>


                        <TextField label="Lobi ID" value={inputId} onChange={(e) => setInputId(e.target.value)}></TextField>
                        <Button
                            variant='contained'
                            onClick={() => {
                                checkLobbyId(inputId);
                                handleCloseJoinModal();
                                setInputId('');
                            }}
                        >Katıl</Button>
                    </Box>
                </Box>
            </Modal>

            <Modal open={modalOpen} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }} >
                    <Typography variant="h6" gutterBottom color="text.primary">Yeni Lobi Oluştur</Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Lobi Adı"
                        value={newLobby.name}
                        onChange={(e) => setNewLobby({ ...newLobby, name: e.target.value })}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Şifre"
                        type="password"
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
                            <MenuItem value="etkinlik" >Etkinlik</MenuItem>
                        </Select>
                    </FormControl>

                    {
                        newLobby.type === "etkinlik" && (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Etkinlik Tarih ve Saati"
                                    ampm={false}
                                    value={newLobby.eventStartDateTime ? dayjs(newLobby.eventStartDateTime) : null}
                                    onChange={(newValue) => {
                                        setNewLobby({
                                            ...newLobby,
                                            eventStartDateTime: newValue ? newValue.toISOString() : null,
                                            // Başlangıç tarihi değiştiğinde, bitiş tarihi başlangıçtan önceyse sıfırlar
                                            eventEndDateTime: newValue && newLobby.eventEndDateTime && dayjs(newLobby.eventEndDateTime).isBefore(newValue)
                                                ? null
                                                : newLobby.eventEndDateTime
                                        });
                                    }}
                                    minDateTime={dayjs()}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            margin="normal"
                                        />
                                    )}
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
                                            ? dayjs(newLobby.eventStartDateTime) // Başlangıç tarihinden öncesini engeller
                                            : dayjs() // Eğer başlangıç tarihi yoksa şu anın öncesini engeller
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            margin="normal"
                                        />
                                    )}
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
                        <Button variant="contained" onClick={createLobby}>
                            Oluştur
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleClose}>
                            İptal
                        </Button>
                    </Box>
                </Box>
            </Modal>


            <Box mt={4}>
                <Typography variant="h6" color="text.primary"> Mevcut Lobiler</Typography>
                {lobbies.length === 0 ? (
                    <Typography >Hiç lobi yok.</Typography>
                ) : (
                    sortedLobbies.map((lobby) => (
                        <Box key={lobby.id} sx={{
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            py: 1,
                            cursor: 'pointer',
                        }}>
                            <Typography onClick={() => handleLobbyClick(lobby)} color="text.primary">
                                <Box component="strong">{lobby.name}</Box> |  {lobby.game} |  {lobby.type}
                            </Typography>
                            <Typography variant="body2">
                                Oyuncular: {lobby.players.length}
                            </Typography>
                            {
                                lobby.startTime &&
                                <Countdown date={lobby.startTime} />
                            }


                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                {lobby.players.includes(userId) ? (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => leaveLobby(lobby.id)}
                                        sx={{ mt: 1 }}
                                    >
                                        Ayrıl
                                    </Button>
                                ) : (
                                    <Button onClick={() => requestJoin(lobby)}
                                        variant="outlined"
                                        color="primary"
                                        sx={{ mt: 1 }}>
                                        Katıl
                                    </Button>
                                )}

                                {lobby.leader === userId && (
                                    <Button
                                        variant="text"
                                        color="error"
                                        onClick={() => deleteLobby(lobby.id)}
                                        sx={{ mt: 1 }}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    ))
                )}
            </Box>

            <Modal open={lobbyModalOpen} onClose={handleCloseLobbyModal}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2
                }}>
                    <Typography variant="h6" gutterBottom color="text.primary">
                        Lobi Detayları
                    </Typography>
                    {selectedLobby && (
                        <>
                            <Typography>Lobi ID: {selectedLobby.id}</Typography>
                            <Typography>Lobi Adı: {selectedLobby.name}</Typography>
                            <Typography>Oyun: {selectedLobby.game}</Typography>
                            <Typography>Tür: {selectedLobby.type}</Typography>
                            <Typography>Oyuncu Sayısı: {selectedLobby.players.length}</Typography>
                        </>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant='contained'
                            onClick={() => {
                                navigator.clipboard.writeText(selectedLobby.id);
                                showAlert('Kod kopyalandı!', 'success');
                            }}>
                            Kodu Kopyala
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleCloseLobbyModal}
                            sx={{ mt: 2 }}
                        >
                            Kapat
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {
                !isInLobby && selectedLobbyId && (
                    <Modal open={!!selectedLobbyId} onClose={() => setSelectedLobbyId(null)}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2
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
                )
            }



        </Box >
    );
}
