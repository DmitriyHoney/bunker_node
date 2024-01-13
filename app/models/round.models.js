const Sequelize = require("sequelize");
const {CARD_TYPES} = require("../dictionary/card.dictionaries");

module.exports = (sequelize) => {
    const Round = sequelize.define("round", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        order: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        allowed_cards_for_open: {
            type: Sequelize.ARRAY(Sequelize.STRING({
                values: Object.values(CARD_TYPES),
            })),
            defaultValue: Object.values(CARD_TYPES),
            validate: {
                checkValid(value) {
                    if (!Array.isArray(value)) throw new Error('not valid Array<Enum> - Card Type');
                    const isValid = value.some((e) => !Object.values(CARD_TYPES).includes(e));
                    if (!isValid) throw new Error('not valid Array<Enum> - Card Type');
                }
            }
        }
    });
    Round.associate = function (models) {
        Round.belongsTo(models.Room)
        Round.hasOne(models.Vote)
    }
    return Round;
};
