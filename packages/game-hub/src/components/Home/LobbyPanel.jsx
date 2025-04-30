// LobbyPanel/LobbyPanel.jsx
import { useContext, useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import socket from '../../socket/socket';
import { AlertContext } from '../../alert/AlertContext';
import Countdown from './Countdown';
import CreateLobbyModal from './Lobby/CreateLobbyModal';
import JoinLobbyModal from './Lobby/JoinLobbyModal';
import LobbyDetailsModal from './Lobby/LobbyDetailsModal';
import PasswordModal from './Lobby/PasswordModal';
import LobbyList from './Lobby/LobbyList';

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
    });
    const [joinPassword, setJoinPassword] = useState('');
    const [selectedLobbyId, setSelectedLobbyId] = useState(null);
    const [selectedLobby, setSelectedLobby] = useState(null);
    const [lobbyModalOpen, setLobbyModalOpen] = useState(false);
    const [joinModalOpen, setJoinModalOpen] = useState(false);
    const [inputId, setInputId] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const handleConnect = () => {
            socket.emit('get-user-id');
            socket.emit('get-lobbies');
        };

        if (socket.connected) {
            handleConnect();
        } else {
            socket.on('connect', handleConnect);
        }

        socket.on('user-id', (id) => {
            setUserId(id);
        });

        socket.on('lobbies', (data) => {
            console.log(data)
            setLobbies(data);
        });

        socket.on('join-success', () => {
            showAlert('Lobiye katıldınız', 'success');
            setJoinPassword('');
            setSelectedLobbyId(null);
            setError('');
        });

        socket.on('join-error', (msg) => setError(msg));

        return () => {
            socket.off('connect', handleConnect);
            socket.off('user-id');
            socket.off('lobbies');
            socket.off('join-success');
            socket.off('join-error');
        };
    }, [showAlert]);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const handleOpenJoinModal = () => setJoinModalOpen(true);
    const handleCloseJoinModal = () => setJoinModalOpen(false);
    const handleLobbyClick = (lobby) => {
        setSelectedLobby(lobby);
        setLobbyModalOpen(true);
    };
    const handleCloseLobbyModal = () => setLobbyModalOpen(false);

    const createLobby = () => {
        if (!newLobby.name.trim()) return;
        socket.emit('create-lobby', { data: newLobby });
        handleClose();
    };

    const requestJoin = (lobby) => setSelectedLobbyId(lobby.id);
    const submitJoin = () => {
        socket.emit('join-lobby', { lobbyId: selectedLobbyId, password: joinPassword });
    };

    const leaveLobby = (id) => {
        socket.emit('leave-lobby', id);
        showAlert('Lobiden ayrıldınız', 'success');
        setSelectedLobbyId(null);
    };

    const deleteLobby = (id) => {
        socket.emit('delete-lobby', id);
        showAlert('Lobi silindi', 'success');
    };

    const checkLobbyId = (inputId) => {
        if (!inputId.trim()) {
            showAlert('Hatalı ID', 'error');
            return;
        }
        const lobby = lobbies.find(lobby => lobby.id === inputId);

        if (lobby) {
            const isLobbyFull = lobby.players.length === lobby.maxPlayers;

            if (isLobbyFull) {
                showAlert('Lobi dolu!', 'error')
            }
            else
                setSelectedLobbyId(inputId);
        } else {
            showAlert('Hatalı ID', 'error');
        }
    };

    const sortedLobbies = [...lobbies].sort((a, b) => {
        if (a.type === "etkinlik" && b.type !== "etkinlik") return -1;
        if (a.type !== "etkinlik" && b.type === "etkinlik") return 1;
        return 0;
    });

    const isInLobby = lobbies.some(lobby => lobby.players.includes(userId));
    const isLeader = lobbies.some(lobby => lobby.leader === userId);

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
                {!isLeader && !isInLobby && <Button variant="contained" color="primary" onClick={handleOpen}>Lobi Oluştur</Button>}
                {!isInLobby && <Button variant="contained" color="primary" onClick={handleOpenJoinModal}>Lobiye Katıl</Button>}
            </Box>

            <CreateLobbyModal
                open={modalOpen}
                handleClose={handleClose}
                newLobby={newLobby}
                setNewLobby={setNewLobby}
                createLobby={createLobby}
            />

            <JoinLobbyModal
                open={joinModalOpen}
                handleClose={handleCloseJoinModal}
                inputId={inputId}
                setInputId={setInputId}
                checkLobbyId={checkLobbyId}
            />

            <LobbyDetailsModal
                open={lobbyModalOpen}
                handleClose={handleCloseLobbyModal}
                selectedLobby={selectedLobby}
                showAlert={showAlert}
            />

            <PasswordModal
                open={!isInLobby && selectedLobbyId}
                handleClose={() => setSelectedLobbyId(null)}
                joinPassword={joinPassword}
                setJoinPassword={setJoinPassword}
                submitJoin={submitJoin}
                error={error}
            />

            <LobbyList
                lobbies={sortedLobbies}
                userId={userId}
                handleLobbyClick={handleLobbyClick}
                leaveLobby={leaveLobby}
                requestJoin={requestJoin}
                deleteLobby={deleteLobby}
            />
        </Box>
    );
}
