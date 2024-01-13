const Validations = require("../validations");
const rooms = require("../controllers/room.controllers.js");

module.exports = (app) => {
  const router = require("express").Router();

  router.post("/", Validations.room.createDataValidate, Validations.common.validatorsErrorsMiddleware, rooms.create);
  router.post("/startgame", Validations.common.authMiddleware, rooms.startgame);

  app.use('/api/v1/rooms', router);
};
