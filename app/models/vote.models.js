const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Vote = sequelize.define("vote", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        count_dropped: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    Vote.associate = function (models) {
        Vote.belongsTo(models.Round);
        Vote.hasMany(models.VoteResult, { as: 'results' });
    }
    return Vote;
};