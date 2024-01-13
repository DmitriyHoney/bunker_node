const { models } = require('../models/index');
const CardDomain = require('../domain/card.domain');
const {CARD_TYPES} = require("../dictionary/card.dictionaries");
const Room = models.Room;


module.exports = {
    async create() {
        try {
            const room = await Room.create();
            return room;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Room");
        }
    },
    async getRoomById(id) {
        try {
            const room = await Room.findByPk(id);
            return room;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Rsoom");
        }
    },
    async createDeck(roomId) {
        const room = await Room.findByPk(roomId);
        const roomPlayers = await room.getPlayers();
        try {
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.biology, roomPlayers);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.health, roomPlayers);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.profession, roomPlayers);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.additional, roomPlayers);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.luggage, roomPlayers);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.phobia, roomPlayers);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.quality, roomPlayers);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.hobby, roomPlayers);
            await CardDomain.getRandomSpecCardsFromDictAndCreateItForPlayer(roomPlayers);
            return true;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Rsoom");
        }
    },
};