const {RoomInfoMap} = require("./room");
const PlayerInfoMap = async (Player) => {
    const room = await Player.getRoom();
    const cards = await Player.getCards();
    const special_cards = await Player.getSpecialCards();
    // const roomSerialize = await RoomInfoMap(room, Player.id);
    return {
        id: Player.id,
        username: Player.username,
        is_owner: Player.is_owner,
        is_dropped: Player.is_dropped,
        room: room.id,
        cards,
        special_cards,
    }
};

const PlayerInfoMapLite = async (Player) => {
    const room = await Player.getRoom();
    return {
        id: Player.id,
        username: Player.username,
        is_owner: Player.is_owner,
        is_dropped: Player.is_dropped,
        room: room.id,
    }
};

module.exports = { PlayerInfoMap, PlayerInfoMapLite };
