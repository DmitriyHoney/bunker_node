const Sequelize = require("sequelize");
const { CARD_TYPES, CARD_SPECIAL_TYPES, SPECIAL_CARD_TIME_OF_ACTIONS } = require("../../dictionary/card.dictionaries");

module.exports = (sequelize) => {
  const DictionaryCard = sequelize.define("dictionary_cards", {
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
    property: {
      type: Sequelize.JSON,
      allowNull: true,
    }
  }, {
    timestamps: false
  });

  DictionaryCard.associate = function (models) {
    DictionaryCard.hasMany(models.Card);
  }

  const DictionarySpecialCard = sequelize.define("dictionary_special_cards", {
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
    property: {
      type: Sequelize.JSON,
      allowNull: true,
    }
  }, {
    timestamps: false
  });

  DictionarySpecialCard.associate = function (models) {
    DictionarySpecialCard.hasMany(models.SpecialCard);
  }

  return { DictionaryCard, DictionarySpecialCard };
};

