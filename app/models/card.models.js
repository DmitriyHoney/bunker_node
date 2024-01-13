const Sequelize = require("sequelize");
const { CARD_TYPES, CARD_SPECIAL_TYPES, SPECIAL_CARD_TIME_OF_ACTIONS } = require("../dictionary/card.dictionaries");
module.exports = (sequelize) => {
    const Card = sequelize.define("cards", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: Sequelize.ENUM,
            values: Object.values(CARD_TYPES),
            allowNull: false,
        },
        is_default: {
            type: Sequelize.BOOLEAN,
            default: false,
        },
        opened_at: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        property: {
            type: Sequelize.JSON,
            allowNull: true,
        }
    }, {
        timestamps: false
    });

    Card.associate = function (models) {
        Card.belongsTo(models.Room);
        Card.belongsTo(models.Player);
        Card.belongsTo(models.Deck);
        Card.belongsTo(models.DictionaryCard);
    }

    const SpecialCard = sequelize.define("special_cards", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: Sequelize.ENUM,
            values: Object.values(CARD_SPECIAL_TYPES),
            allowNull: false,
        },
        time_of_action: {
            type: Sequelize.ENUM,
            values: Object.values(SPECIAL_CARD_TIME_OF_ACTIONS),
            allowNull: false,
        },
        opened_at: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        property: {
            type: Sequelize.JSON,
            allowNull: true,
        }
    }, {
        timestamps: false
    });

    SpecialCard.associate = function (models) {
        SpecialCard.belongsTo(models.Player);
        SpecialCard.belongsTo(models.Deck);
        SpecialCard.belongsTo(models.DictionarySpecialCard);
    }

    return { Card, SpecialCard };
};

