const { models, sequelize } = require('../models/index');
const DictionaryCard = models.DictionaryCard;
const DictionarySpecialCard = models.DictionarySpecialCard;
const Card = models.Card;
const SpecialCard = models.SpecialCard;
const { Op } = require('sequelize');
const {CARD_TYPES} = require("../dictionary/card.dictionaries");
module.exports = {
    async getRandomCardsFromDictAndCreateItForPlayer(cardType, playersArray, deck) {
        try {
            const dictionaryCards = await DictionaryCard.findAll({
                order: sequelize.random(), limit: playersArray.length,
                where: { [Op.and]: [{ type: cardType } ] }
            })
            const nCards = await Card.bulkCreate(
                dictionaryCards.map(({ type, is_default, property, id }, idx) => ({ type, is_default, property, dictionaryCardId: id, playerId: playersArray[idx].id, deckId: deck.id })),
                // {include: [deck]}
            );
            return nCards;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Card and CardDictionary");
        }
    },
    async getCardBunkerFromDictAndCreateItForRoom(roomId, deck, bunkerSize) {
        try {
            const bunkerProperty = {
                size: bunkerSize,
                timeSpent: getRandomWorkTime(),
                foodCount: getRandomNumber()
            }
            const dictionaryCards = await DictionaryCard.findAll({
                order: sequelize.random(), limit: 1,
                where: {
                    [Op.and]: [{ type: CARD_TYPES.bunker } ],
                }
            })
            const nCards = await Card.bulkCreate(
                dictionaryCards.map(({ type, is_default, property, id }, idx) => ({ type, is_default, property: { ...property, ...bunkerProperty}, dictionaryCardId: id, roomId: roomId, deckId: deck.id })),
            );
            return nCards;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Card and CardDictionary");
        }
    },
    async getCardDisasterFromDictAndCreateItForRoom(roomId, deck) {
        try {
            const dictionaryCards = await DictionaryCard.findAll({
                order: sequelize.random(), limit: 1,
                where: {
                    [Op.and]: [{ type: CARD_TYPES.disaster } ],
                }
            })
            const nCards = await Card.bulkCreate(
                dictionaryCards.map(({ type, is_default, property, id }, idx) => ({ type, is_default, property, dictionaryCardId: id, roomId: roomId, deckId: deck.id })),
            );
            return nCards;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Card and CardDictionary");
        }
    },
    async getRandomLuggageCardsFromDictAndCreateItForRoom(limit, roomId, deck) {
        try {
            const cardsInDeck = await deck.getCards()
            const excludeCardId = cardsInDeck
                .filter((c) => c.type === CARD_TYPES.luggage)
                .map((c) => c.dictionaryCardId)
            const dictionaryCards = await DictionaryCard.findAll({
                order: sequelize.random(), limit,
                where: {
                    [Op.and]: [{ type: CARD_TYPES.luggage } ],
                    id: {
                        [Op.notIn]: excludeCardId
                    }
                }
            })
            const nCards = await Card.bulkCreate(
                dictionaryCards.map(({ type, is_default, property, id }, idx) => ({ type, is_default, property, dictionaryCardId: id, roomId: roomId, deckId: deck.id })),
            );
            return nCards;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Card and CardDictionary");
        }
    },
    async getRandomSpecCardsFromDictAndCreateItForPlayer(playersArray, deck) {
        try {
            const dictionaryCards = await DictionarySpecialCard.findAll({
                order: sequelize.random(), limit: playersArray.length * 2,
            })
            const nCards = await SpecialCard.bulkCreate(
                dictionaryCards.map(({ type, is_default, time_of_action, property, id }, idx) => ({ type, is_default, time_of_action, property, dictionaryCardId: id, playerId: playersArray[Math.floor(idx / 2)].id, deckId: deck.id })),
                // {include: [deck]}
                );
            return nCards;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Card and CardDictionary");
        }
    },
};

function getRandomWorkTime() {
    // Определяем максимальное количество дней
    const maxDays = 365 * 5; // Например, максимальное время - 5 лет
    const minDays = 1; // Минимальное время - 1 день

    // Генерируем случайное количество дней
    const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;

    // Переводим дни в удобный формат - години, месяца и годы
    const years = Math.floor(randomDays / 365);
    const months = Math.floor((randomDays % 365) / 30);
    const days = randomDays % 30;

    return {
        years: years,
        months: months,
        days: days
    };
}

function getRandomNumber() {
    return Math.floor(Math.random() * 101); // Генерирует число от 0 до 100
}
