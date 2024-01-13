const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Room = sequelize.define("room", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    is_game_start: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_game_end: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    min_players: {
      type: Sequelize.INTEGER,
      defaultValue: 6,
    },
    max_players: {
      type: Sequelize.INTEGER,
      defaultValue: 16,
    },
  }, {
    timestamps: false
  });
  Room.associate = function (models) {
    Room.hasMany(models.Card, { as: 'cards' });
    Room.hasMany(models.Round, { as: 'rounds' });
    Room.hasMany(models.Player);
    Room.belongsTo(models.Deck);
  }
  return Room;
};
