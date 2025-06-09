import { lobbies } from "./lobby.js";

// Her lobi için ayrı oyun state'i tutacak
let gameRooms = {};

const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);

const drawnRandomnumber = (roomId) => {
    if (!gameRooms[roomId]) {
        gameRooms[roomId] = {
            players: [],
            availableNumbers: [...allNumbers],
            gameStarted: false
        };
    }

    const room = gameRooms[roomId];
    if (room.availableNumbers.length === 0) {
        return 0;
    }

    const randomIndex = Math.floor(Math.random() * room.availableNumbers.length);
    const drawnNumber = room.availableNumbers[randomIndex];

    room.availableNumbers.splice(randomIndex, 1);

    return drawnNumber;
}

const generateGameCard = (adet = 15, min = 1, max = 90) => {
    const sayilar = new Set();

    while (sayilar.size < adet) {
        const sayi = Math.floor(Math.random() * (max - min + 1)) + min;
        sayilar.add(sayi)
    }
    return Array.from(sayilar);
}

// Lobi silmek için yardımcı fonksiyon
const deleteGameRoom = (roomId) => {
    delete gameRooms[roomId];
}

const tombalaGame = (io) => {

    io.on('connection', (socket) => {
        const session = socket.request.session;
        const user = session.user;

        if (!user || !user.userId) {
            socket.disconnect();
            return;
        }

        const playerId = user.userId;

        socket.on('get-player-id', () => {
            socket.emit('player-id', playerId);
        });

        // Belirli bir lobinin oyununa katılma
        socket.on('join-game-room', (lobbyId) => {
            // Lobi kontrolü
            const lobby = lobbies.find(l => l.id === lobbyId);
            if (!lobby) {
                socket.emit('error', 'Lobi bulunamadı.');
                return;
            }

            // Kullanıcının lobide olup olmadığını kontrol et
            if (!lobby.players.includes(playerId)) {
                socket.emit('error', 'Bu lobiye katılma yetkiniz yok.');
                return;
            }

            if (!gameRooms[lobbyId]) {
                gameRooms[lobbyId] = {
                    players: [],
                    availableNumbers: [...allNumbers],
                    gameStarted: false
                };
            }

            const room = gameRooms[lobbyId];
            const existingPlayer = room.players.find(p => p.id === playerId);

            if (!existingPlayer) {
                const newPlayer = {
                    id: playerId,
                    gameCard: generateGameCard(),

                }

                room.players.push(newPlayer);
                socket.join(lobbyId); // Socket'i odaya ekle

                // Sadece o odadaki oyunculara gönder
                io.to(lobbyId).emit('players-list', room.players);
            } else {
                socket.join(lobbyId); // Zaten mevcut oyuncuyu odaya ekle
                socket.emit('players-list', room.players);
            }
        });

        // Belirli bir lobinin oyuncu listesini alma
        socket.on('get-players-list', (lobbyId) => {
            if (gameRooms[lobbyId]) {
                socket.emit('players-list', gameRooms[lobbyId].players);
            } else {
                socket.emit('players-list', []);
            }
        });

        // Sayı çekme (lobi-bazlı)
        socket.on('pick-number', (lobbyId) => {
            if (!gameRooms[lobbyId]) return;

            const pickedNumber = drawnRandomnumber(lobbyId);

            // Sadece o odadaki oyunculara sayıyı gönder
            io.to(lobbyId).emit('picked-number', pickedNumber);
        });

        //SOHBET
        socket.on('game-chat', (lobbyId, playerId, message) => {

            const lobby = lobbies.find(l => l.id === lobbyId);
            lobby.chat.push({
                username: playerId,
                message: message
            });

            io.to(lobbyId).emit('chatbox', lobby.chat);


        })

        // Oyuncunun lobiden ayrılması
        socket.on('leave-game-room', (lobbyId) => {
            if (gameRooms[lobbyId]) {
                const room = gameRooms[lobbyId];
                room.players = room.players.filter(p => p.id !== playerId);

                socket.leave(lobbyId);

                // Odadaki diğer oyunculara güncel listeyi gönder
                io.to(lobbyId).emit('players-list', room.players);

                // Lobi bilgilerini al
                const lobby = lobbies.find(l => l.id === lobbyId);

                // Eğer odada kimse kalmadıysa veya ayrılan kişi lobi lideri ise lobiyi sil
                if (room.players.length === 0 || (lobby && lobby.leader === playerId)) {
                    deleteGameRoom(lobbyId);
                    // Lobi silme eventi gönder
                    io.emit('lobby-deleted', {
                        lobbyId: lobbyId,
                        lobbyName: lobby ? lobby.name : 'Bilinmeyen Lobi',
                        reason: room.players.length === 0 ? 'Odada oyuncu kalmadı' : 'Lobi lideri ayrıldı'
                    });
                    // Lobi listesinden de sil
                    const lobbyIndex = lobbies.findIndex(l => l.id === lobbyId);
                    if (lobbyIndex !== -1) {
                        lobbies.splice(lobbyIndex, 1);
                        io.emit('lobbies', lobbies);
                    }
                }
            }
        });

        // Socket disconnect olduğunda temizleme
        socket.on('disconnect', () => {
            // Tüm odalarda bu oyuncuyu ara ve kaldır
            Object.keys(gameRooms).forEach(roomId => {
                const room = gameRooms[roomId];
                const playerIndex = room.players.findIndex(p => p.id === playerId);

                if (playerIndex !== -1) {
                    room.players.splice(playerIndex, 1);
                    socket.leave(roomId);

                    // Odadaki diğer oyunculara güncel listeyi gönder
                    io.to(roomId).emit('players-list', room.players);

                    // Lobi bilgilerini al
                    const lobby = lobbies.find(l => l.id === roomId);

                    // Eğer odada kimse kalmadıysa veya ayrılan kişi lobi lideri ise lobiyi sil
                    if (room.players.length === 0 || (lobby && lobby.leader === playerId)) {
                        deleteGameRoom(roomId);
                        // Lobi silme eventi gönder
                        io.emit('lobby-deleted', {
                            lobbyId: roomId,
                            lobbyName: lobby ? lobby.name : 'Bilinmeyen Lobi',
                            reason: room.players.length === 0 ? 'Odada oyuncu kalmadı' : 'Lobi lideri ayrıldı'
                        });
                        // Lobi listesinden de sil
                        const lobbyIndex = lobbies.findIndex(l => l.id === roomId);
                        if (lobbyIndex !== -1) {
                            lobbies.splice(lobbyIndex, 1);
                            io.emit('lobbies', lobbies);
                        }
                    }
                }
            });
        });

        // Oyun kazananı bildirimi
        socket.on('game-winner', ({ winnerId }) => {
            const room = Object.entries(gameRooms).find(([_, room]) =>
                room.players.some(player => player.id === winnerId)
            );

            if (room) {
                const [roomId, roomData] = room;
                // Tüm oyunculara kazananı bildir
                io.to(roomId).emit('game-end', {
                    winner: winnerId,
                    message: `${winnerId} TOMBALA yaptı! Oyun bitti!`
                });

                // Oyun odasını temizle
                deleteGameRoom(roomId);
            }
        });
    });
}

export { tombalaGame, deleteGameRoom }