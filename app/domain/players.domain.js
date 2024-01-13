const { models } = require('../models/index');
const Player = models.Player;

module.exports = {
    async createPlayerWithRoom(Room, { username, is_owner= false, is_dropped = false }) {
        try {
            const player = await Player.create({ username, is_owner, is_dropped });
            await player.setRoom(Room);
            return player;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Player");
        }
    },
    async getPlayerById(id) {
        try {
            const player = await Player.findByPk(id);
            return player;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Player");
        }
    },
};