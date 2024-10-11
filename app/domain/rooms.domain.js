const { models } = require('../models/index');
const CardDomain = require('../domain/card.domain');
const {CARD_TYPES} = require("../dictionary/card.dictionaries");
const Room = models.Room;
const Deck = models.Deck;

const getRoomRulesByCountPlayers = (countPlayers) => {
    const MIN_PLAYERS = 4;
    const MAX_PLAYERS = 16;
    const isCountPlayerNotValid = countPlayers < MIN_PLAYERS || countPlayers > MAX_PLAYERS;
    if (isCountPlayerNotValid) throw new Error("countPlayers must be 4 <= x <= 16");
    const createResult = (roundVotes = [], countPlayers) => {
        const [cVot1, cVot2, cVot3, cVot4, cVot5] = roundVotes;
        const sumVotes = roundVotes.reduce((acc, val) => acc + val);
        return {
            rounds: [
                { order: 1, countVotes: cVot1 },
                { order: 2, countVotes: cVot2 },
                { order: 3, countVotes: cVot3 },
                { order: 4, countVotes: cVot4 },
                { order: 5, countVotes: cVot5 },
            ],
            numberOfexpelled: sumVotes,
            bunkerSize: countPlayers - sumVotes,
            bunkerLuggageCountCard: 5
        }
    }
    const result = {
        4: createResult([0, 0, 0, 1, 1], 4),
        5: createResult([0, 0, 1, 1, 1], 5),
        6: createResult([0, 0, 1, 1, 1], 6),
        7: createResult([0, 1, 1, 1, 1], 7),
        8: createResult([0, 1, 1, 1, 1], 8),
        9: createResult([0, 1, 1, 1, 2], 9),
        10: createResult([0, 1, 1, 1, 2], 10),
        11: createResult([0, 1, 1, 2, 2], 11),
        12: createResult([0, 1, 1, 2, 2], 12),
        13: createResult([0, 1, 2, 2, 2], 13),
        14: createResult([0, 1, 2, 2, 2], 14),
        15: createResult([0, 2, 2, 2, 2], 15),
        16: createResult([0, 2, 2, 2, 2], 16),
    };

    return result[countPlayers];
};

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
    // TODO: rename function because it doing a lot of actions
    async createDeck(roomId) {
        const room = await Room.findByPk(roomId);
        const roomPlayers = await room.getPlayers();
        const deck = await Deck.create();
        await deck.setRoom(room);
        try {
            // generate rules for room by playerCounts
            const { bunkerSize, bunkerLuggageCountCard } = getRoomRulesByCountPlayers(roomPlayers.length);

            // generate cards for players and link them to the Deck model
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.biology, roomPlayers, deck);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.health, roomPlayers, deck);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.profession, roomPlayers, deck);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.additional, roomPlayers, deck);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.luggage, roomPlayers, deck);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.phobia, roomPlayers, deck);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.quality, roomPlayers, deck);
            await CardDomain.getRandomCardsFromDictAndCreateItForPlayer(CARD_TYPES.hobby, roomPlayers, deck);
            await CardDomain.getRandomSpecCardsFromDictAndCreateItForPlayer(roomPlayers, deck);

            // create cards for room and link them to the Deck model
            await CardDomain.getCardBunkerFromDictAndCreateItForRoom(room.id, deck, bunkerSize);
            await CardDomain.getCardDisasterFromDictAndCreateItForRoom(room.id, deck);
            await CardDomain.getRandomLuggageCardsFromDictAndCreateItForRoom(bunkerLuggageCountCard, room.id, deck);

            // create rounds for room
            // create votes for each round
            // TODO: change association round -> vote to m2m

            return true;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Rsoom");
        }
    },
};
