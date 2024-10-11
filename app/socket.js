const {Server} = require("socket.io");

const EVENTS = {
    'user:disconnect': () => console.log("User disconnect"),
    'user:connect': () => console.log("User connect"),
    'user:auth_and_join_room': () => console.log("User auth_and_join_room"),
}

const EMIT_EVENTS = {
    'user:connect': () => console.log("User connect")
}
let socketInstanse = null;

module.exports = {
    socketInit: (server) => {
        const io = new Server(server, {
            cors: {origin: '*'},
        });
        io.on('connection', (socket) => {
            socketInstanse = socket
            Object.keys(EVENTS).forEach((eventKey) => socket.on(eventKey, EVENTS[eventKey]))
        });
        return io;
    },
    actions: (io) => {
        const EVENTS = {
            PLAYER_JOIN_ROOM: 'PLAYER_JOIN_ROOM',
            START_GAME_IN_ROOM: 'START_GAME_IN_ROOM',
        };
        const createPayload = (type, payload) => ({ type, data: { ...payload } });
        return {
            PLAYER_JOIN_ROOM: (roomId, player) => io.emit(`room_${roomId}`, createPayload(EVENTS.PLAYER_JOIN_ROOM, { player })),
            START_GAME_IN_ROOM: (roomId) => io.emit(`room_${roomId}`, createPayload(EVENTS.START_GAME_IN_ROOM)),
        }
    }
}
