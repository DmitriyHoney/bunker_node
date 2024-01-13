const dbConfig = require("../settings.js").db;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  // port: 80dd,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const {
  DictionaryCard,
  DictionarySpecialCard
} = require("./dictionary/dictionary_card.models")(sequelize);

const {
  Card,
  SpecialCard
} = require("./card.models")(sequelize);

db.models = {
  DictionaryCard,
  DictionarySpecialCard,
  Card,
  SpecialCard,
  Deck: require("./deck.models.js")(sequelize),
  Room: require("./room.models.js")(sequelize),
  Player: require("./player.models.js")(sequelize),
  Round: require("./round.models.js")(sequelize),
  Vote: require("./vote.models.js")(sequelize),
  VoteResult: require("./vote_results.models.js")(sequelize),
};
Object.values(db.models).forEach((m) => m.associate ? m.associate(db.models) : null);

// TODO: add dev mode for force
db.init = () =>
  db.sequelize
    .sync({ force: false })
    .then(() => console.log('success'))
    .catch(console.error);
module.exports = db;
