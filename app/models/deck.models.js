const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Deck = sequelize.define("deck", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    });
    Deck.associate = function (models) {
        Deck.hasOne(models.Room);
        Deck.hasMany(models.Card, { as: 'cards' });
        Deck.hasMany(models.SpecialCard, { as: 'special_cards' });
    }
    return Deck;
};
