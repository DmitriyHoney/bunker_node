const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Player = sequelize.define("player", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_owner: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
    is_dropped: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  }, {
    timestamps: false
  });

  Player.associate = function (models) {
    Player.belongsTo(models.Room);
    Player.hasMany(models.Card, { as: 'cards' });
    Player.hasMany(models.SpecialCard, { as: 'SpecialCards' });
    Player.belongsToMany(models.VoteResult, { through: 'player_votes' })
    Player.belongsToMany(models.VoteResult, { through: 'opponent_votes' })
  }

  return Player;
};
