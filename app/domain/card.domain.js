const { models, sequelize } = require('../models/index');
const DictionaryCard = models.DictionaryCard;
const DictionarySpecialCard = models.DictionarySpecialCard;
const Card = models.Card;
const SpecialCard = models.SpecialCard;
const { Op } = require('sequelize');
module.exports = {
    async getRandomCardsFromDictAndCreateItForPlayer(cardType, playersArray) {
        try {
            const dictionaryCards = await DictionaryCard.findAll({
                order: sequelize.random(), limit: playersArray.length,
                where: { [Op.and]: [{ type: cardType } ] }
            })
            const nCards = await Card.bulkCreate(
                dictionaryCards.map(({ type, is_default, property, id }, idx) => ({ type, is_default, property, dictionaryCardId: id, playerId: playersArray[idx].id })),
            );
            return nCards;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Card and CardDictionary");
        }
    },
    async getRandomSpecCardsFromDictAndCreateItForPlayer(playersArray) {
        try {
            const dictionaryCards = await DictionarySpecialCard.findAll({
                order: sequelize.random(), limit: playersArray.length * 2,
            })
            const nCards = await SpecialCard.bulkCreate(
                dictionaryCards.map(({ type, is_default, time_of_action, property, id }, idx) => ({ type, is_default, time_of_action, property, dictionaryCardId: id, playerId: playersArray[Math.floor(idx / 2)].id })),
            );
            return nCards;
        } catch (err) {
            console.error(err);
            throw new Error("Some error occurred while creating the Card and CardDictionary");
        }
    },
};