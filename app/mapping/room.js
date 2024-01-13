const RoomInfoMap = async (Room, playerId) => {
    const players = await Room.getPlayers();
    return {
        id: Room.id,
        is_game_start: Room.is_game_start,
        is_game_end: Room.is_game_end,
        min_players: Room.min_players,
        max_players: Room.max_players,
        deckId: Room.deckId,
        players,
    }
};

module.exports = { RoomInfoMap };