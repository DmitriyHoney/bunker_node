const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  db: {
    HOST: 'bunker_db',
    USER: process.env.POSTGRES_USER || 'test_user',
    PASSWORD: process.env.POSTGRES_PASSWORD || 'test_db',
    DB: process.env.POSTGRES_DB || 'test_db',
    PORT: process.env.DB_PORT || 5432,
    BACKEND_PORT: process.env.BACK_PORT || 3000,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
