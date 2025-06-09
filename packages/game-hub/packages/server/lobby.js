import { deleteGameRoom } from './tombala.js';

let lobbies = [
];

const gameSettings = {
    'Tombala': 16,
    'Satranc': 2,
    'Mangala': 2,
    'UNO': 4,
};

const generateLobbyId = () => Math.random().toString(36).substr(2, 6);

const checkExpiredLobbies = () => {
    const now = new Date();
    lobbies = lobbies.filter(lobby => {
        if (lobby.type === "etkinlik" && lobby.endTime) {
            return new Date(lobby.endTime) > now;
        }
        return true;
    });
};

const lobbyHandler = (io) => {
    setInterval(() => {
        checkExpiredLobbies();
        io.emit('lobbies', lobbies);
    }, 60000);

    io.on('connection', (socket) => {
        const session = socket.request.session;
        const user = session?.user;

        console.log("SOCKET SESSION CHECK:", socket.request?.session);

        if (!user || !user.userId) {
            socket.disconnect();
            return;
        }

        const userId = user.userId;

        socket.on('get-user-id', () => {
            socket.emit('user-id', userId);
        });

        socket.on('get-lobbies', () => {
            socket.emit('lobbies', lobbies);
        });

        socket.on('create-lobby', ({ data }) => {
            const { name, type, password, game, eventStartDateTime, eventEndDateTime } = data;
            const lobbyId = generateLobbyId();
            const leaderId = userId;
            const maxPlayers = gameSettings[game];

            const newLobby = {
                id: lobbyId,
                name,
                type,
                password,
                game,
                chat: [],
                leader: leaderId,
                players: [leaderId],
                startTime: eventStartDateTime,
                endTime: eventEndDateTime,
                gameStarted: false,
                maxPlayers
            };

            lobbies.push(newLobby);
            socket.join(lobbyId);
            io.emit('lobbies', lobbies);
        });

        socket.on('join-lobby', ({ lobbyId, password }) => {
            const lobby = lobbies.find(l => l.id === lobbyId);
            if (!lobby) return;

            //Kullanıcı herhangi bir lobiye katılmış mı
            const check = lobbies.find(l => l.players.includes(userId));

            if (!check) {
                if (lobby.password && lobby.password !== password) {
                    socket.emit('join-error', 'Şifre yanlış!');
                    return;
                }

                lobby.players.push(userId);
                io.emit('lobbies', lobbies);
                socket.emit('join-success', lobby);
            }
        });

        socket.on('leave-lobby', (lobbyId) => {
            const lobby = lobbies.find(l => l.id === lobbyId);
            if (lobby) {

                //Ayrılmak isteyen kullanıcıyı diziden çıkarır
                lobby.players = lobby.players.filter(id => id !== userId);

                // Oyun odasından da ayrıl (sadece o kullanıcı için)
                try {
                    socket.emit('leave-game-room', lobbyId);
                } catch (error) {
                    console.log('Oyun odasından ayrılma hatası:', error);
                }

                io.emit('lobbies', lobbies);
            }
        });

        socket.on('delete-lobby', (lobbyId) => {
            const lobby = lobbies.find(l => l.id === lobbyId);

            if (lobby && lobby.leader === userId) {
                // Lobideki tüm oyunculara lobi silindiğini bildir
                lobby.players.forEach(playerId => {
                    const playerSocket = Array.from(io.sockets.sockets.values())
                        .find(s => s.request?.session?.user?.userId === playerId);

                    if (playerSocket) {
                        playerSocket.emit('lobby-deleted', { lobbyId, lobbyName: lobby.name });
                    }
                });

                console.log(`Lobi silindi: ${lobby.name} (${lobbyId})`);
            }

            //Silmek istenilen lobiyi diziden çıkarır
            lobbies = lobbies.filter(l => l.id !== lobbyId);

            // İlgili oyun odasını da sil
            try {
                deleteGameRoom(lobbyId);
            } catch (error) {
                console.log('Oyun odası silme hatası:', error);
            }

            io.emit('lobbies', lobbies);
        });

        // Lobi bilgilerini alma
        socket.on('get-lobby-info', (lobbyId) => {
            const lobby = lobbies.find(l => l.id === lobbyId);
            if (lobby) {
                socket.emit('lobby-info', lobby);
            }
        });

        // Oyun başlatma eventi (bekleme ekranına yönlendirme)
        socket.on('start-game', ({ lobbyId, game }) => {
            const lobby = lobbies.find(l => l.id === lobbyId);

            if (lobby && lobby.leader === userId) {
                // Tüm oyuncuları bekleme ekranına yönlendir
                lobby.players.forEach(playerId => {
                    const playerSocket = Array.from(io.sockets.sockets.values())
                        .find(s => s.request?.session?.user?.userId === playerId);

                    if (playerSocket) {
                        playerSocket.emit('redirect-to-game', { lobbyId, game });
                    }
                });

                console.log(`Oyuncular bekleme ekranına yönlendirildi: ${game} - Lobi: ${lobbyId}`);
            }
        });

        // Gerçek oyun başlatma eventi (bekleme ekranından oyuna geçiş)
        socket.on('game-started', ({ lobbyId, game }) => {
            const lobby = lobbies.find(l => l.id === lobbyId);

            if (lobby && lobby.leader === userId) {
                // Tüm oyunculara oyunun başladığını bildir
                lobby.gameStarted = true
                io.to(lobbyId).emit('game-started', { lobbyId, game });
                console.log(`Oyun başlatıldı: ${game} - Lobi: ${lobbyId}`);
            }
        });
    });
};

export { gameSettings, lobbies, checkExpiredLobbies, lobbyHandler };
