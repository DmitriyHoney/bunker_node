const Validations = require('../validations');
const players = require('../controllers/player.controllers.js');

module.exports = (app) => {
  const router = require('express').Router();
  router.get(
    '/me',
    Validations.common.authMiddleware,
    Validations.common.validatorsErrorsMiddleware,
    players.getMe
  );
  router.post(
    '/',
    Validations.player.createDataValidate,
    Validations.common.validatorsErrorsMiddleware,
    players.create
  );
  app.use('/api/v1/players', router);
};
