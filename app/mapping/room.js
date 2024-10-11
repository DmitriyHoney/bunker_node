const { player } = require('./index')

const RoomInfoMap = async (Room, playerId) => {
    const players = await Room.getPlayers();
    const cards = await Room.getCards();
    const playersPromises = players.map(async (p) => {
        const playerCards = await p.getCards()
        return Promise.resolve({ ...p.dataValues, cards: playerCards.filter((c) => c.opened_at) })
    });
    const playersSerialize = await Promise.all(playersPromises)
    return {
        id: Room.id,
        is_game_start: Room.is_game_start,
        is_game_end: Room.is_game_end,
        min_players: Room.min_players,
        max_players: Room.max_players,
        deckId: Room.deckId,
        players: playersSerialize,
        cards,
    }
};

module.exports = { RoomInfoMap };
