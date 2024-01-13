const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const VoteResult = sequelize.define("vote_result", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vote_weight: {
            type: Sequelize.INTEGER,
            default: 1,
        },
    });
    VoteResult.associate = function (models) {
        VoteResult.belongsTo(models.Vote)
        VoteResult.belongsToMany(models.Player, { through: 'player_votes' })
        VoteResult.belongsToMany(models.Player, { through: 'opponent_votes' })
    };
    return VoteResult;
};


