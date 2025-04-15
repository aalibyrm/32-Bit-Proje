import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Modal, Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect, useState } from 'react';
import socket from '../../socket/socket';
import { AlertContext } from '../../alert/AlertContext';

export default function LobbyPanel() {

    const { showAlert } = useContext(AlertContext);
    const [lobbies, setLobbies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newLobby, setNewLobby] = useState({
        name: '',
        password: '',
        type: 'normal',
        game: ''
    })

    const [joinPassword, setJoinPassword] = useState('');
    const [selectedLobbyId, setSelectedLobbyId] = useState(null);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);
    /*  const [isLeader, setIsLeader] = useState(false); */



    useEffect(() => {
        socket.emit('get-user-id');
        socket.on('user-id', (id) => {
            setUserId(id);
        });


        socket.on('lobbies', (lobbies) => {
            setLobbies(lobbies);
        });


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

    return (
        <Box p={2} sx={{
            overflowY: 'auto', height: '100%', overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
        }}>

            {
                !isLeader &&
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    ➕ Lobi Oluştur
                </Button>
            }


            <Modal open={modalOpen} onClose={handleClose}>
                <Box >
                    <Typography variant="h6" gutterBottom>Yeni Lobi Oluştur</Typography>

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
                            <MenuItem value="etkinlik">Etkinlik</MenuItem>
                        </Select>
                    </FormControl>

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
                <Typography variant="h6">📜 Mevcut Lobiler</Typography>
                {lobbies.length === 0 ? (
                    <Typography>Hiç lobi yok.</Typography>
                ) : (
                    lobbies.map((lobby) => (
                        <Box key={lobby.id} sx={{ borderBottom: '1px solid #ccc', py: 1 }}>
                            <Typography>
                                <strong>{lobby.name}</strong> | 🎮 {lobby.game} | 🧭 {lobby.type}
                            </Typography>
                            <Typography variant="body2">
                                Oyuncular: {lobby.players.length}
                            </Typography>

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

            {
                !isInLobby && selectedLobbyId && (
                    <Box mt={3} sx={{ border: '1px dashed red', p: 2 }}>
                        <Typography>🔐 Şifre Gerekli</Typography>
                        <TextField
                            label="Lobi Şifresi"
                            type="password"
                            value={joinPassword}
                            onChange={(e) => setJoinPassword(e.target.value)}
                        />
                        <Button variant="contained" onClick={submitJoin} sx={{ ml: 2 }}>
                            Katıl
                        </Button>
                        {error && (
                            <Typography color="error" mt={1}>
                                {error}
                            </Typography>
                        )}
                    </Box>
                )

            }



        </Box >
    );
}
