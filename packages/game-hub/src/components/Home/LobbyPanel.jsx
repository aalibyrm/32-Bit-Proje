// LobbyPanel/LobbyPanel.jsx
import { useContext, useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
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

        socket.on('join-success', (lobby) => {
            showAlert('Lobiye katıldınız', 'success');
            setJoinPassword('');
            setSelectedLobbyId(null);
            setError('');

            // Eğer oyun Tombala ise, bekleme ekranına yönlendir
            if (lobby.game === 'Tombala') {
                navigate(`/tombala/${lobby.id}`);
            }
        });

        socket.on('join-error', (msg) => setError(msg));

        // Lobi silindiği bildirimini dinle
        socket.on('lobby-deleted', ({ lobbyId, lobbyName }) => {
            showAlert(`Lobi "${lobbyName}" silindi!`, 'warning');
        });

        return () => {
            socket.off('connect', handleConnect);
            socket.off('user-id');
            socket.off('lobbies');
            socket.off('join-success');
            socket.off('join-error');
            socket.off('lobby-deleted');
        };
    }, [showAlert, navigate]);

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

    //Etkinlikler önce gelcek şekilde sıralar
    const sortedLobbies = [...lobbies].sort((a, b) => {
        if (a.type === "etkinlik" && b.type !== "etkinlik") return -1;
        if (a.type !== "etkinlik" && b.type === "etkinlik") return 1;
        return 0;
    });

    const isInLobby = lobbies.some(lobby => lobby.players.includes(userId));
    const isLeader = lobbies.some(lobby => lobby.leader === userId);
    const hasStartedGames = lobbies.some(lobby => lobby.gameStarted === true);

    return (
        <Box
            p={2}
            className="gradient-bg"
            sx={{
                overflowY: 'auto',
                height: '100%',
                background: theme.palette.background.default,
                color: theme.palette.text.primary,
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                backgroundAttachment: 'fixed',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: theme.palette.mode === 'dark'
                        ? 'radial-gradient(circle at 20% 20%, rgba(158, 35, 222, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)'
                        : 'radial-gradient(circle at 20% 20%, rgba(141, 23, 24, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(141, 23, 24, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                    mb: 3,
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {!isLeader && !isInLobby && (
                    <Button
                        variant="contained"
                        onClick={handleOpen}
                        sx={{
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, #9E23DE 0%, #FF6B6B 100%)'
                                : 'linear-gradient(135deg, #8d1718 0%, #8d1718 100%)',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            py: 1.5,
                            px: 3,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(158, 35, 222, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 8px 32px rgba(158, 35, 222, 0.3)'
                                : '0 8px 32px rgba(141, 23, 24, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, #B947F1 0%, #FF8E8E 100%)'
                                    : 'linear-gradient(135deg, #B91A1C 0%, #B91A1C 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 12px 40px rgba(158, 35, 222, 0.4)'
                                    : '0 12px 40px rgba(141, 23, 24, 0.4)',
                            },
                        }}
                    >
                        Lobi Oluştur
                    </Button>
                )}
                {!isInLobby && (
                    <Button
                        variant="contained"
                        onClick={handleOpenJoinModal}
                        sx={{
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(135deg, #4ECDC4 0%, #9E23DE 100%)'
                                : 'linear-gradient(135deg, #8d1718 0%, #8d1718 100%)',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            py: 1.5,
                            px: 3,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(78, 205, 196, 0.3)' : 'rgba(141, 23, 24, 0.3)'}`,
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 8px 32px rgba(78, 205, 196, 0.3)'
                                : '0 8px 32px rgba(141, 23, 24, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: theme.palette.mode === 'dark'
                                    ? 'linear-gradient(135deg, #5FD4CE 0%, #B947F1 100%)'
                                    : 'linear-gradient(135deg, #B91A1C 0%, #B91A1C 100%)',
                                transform: 'translateY(-2px)',
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 12px 40px rgba(78, 205, 196, 0.4)'
                                    : '0 12px 40px rgba(141, 23, 24, 0.4)',
                            },
                        }}
                    >
                        Lobiye Katıl
                    </Button>
                )}
            </Box>

            <Box sx={{ position: 'relative', zIndex: 1 }}>
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
        </Box>
    );
}
