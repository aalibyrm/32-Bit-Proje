let lobbies = [
    {
        id: "4ot5ra",
        name: "Deneme",
        type: "Etkinlik",
        password: "1",
        game: "Tombala",
        leader: "kurucu1",
        players: [13215],
        startTime: "2025-04-30T13:20:00.000Z",
        endTime: "2025-04-30T21:00:00.000Z",
        maxPlayers: 16
    },
    {
        id: "r6fv3c",
        name: "Deneme 2",
        type: "Normal",
        password: "1",
        game: "UNO",
        leader: "kurucu2",
        players: [33, 22, 11, 2],
        startTime: null,
        endTime: null,
        maxPlayers: 4
    }
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
                leader: leaderId,
                players: [leaderId],
                startTime: eventStartDateTime,
                endTime: eventEndDateTime,
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
                io.emit('lobbies', lobbies);
            }
        });

        socket.on('delete-lobby', (lobbyId) => {

            //Silmek istenilen lobiyi diziden çıkarır
            lobbies = lobbies.filter(l => l.id !== lobbyId);
            io.emit('lobbies', lobbies);
        });
    });
};

export { gameSettings, lobbies, checkExpiredLobbies, lobbyHandler };
