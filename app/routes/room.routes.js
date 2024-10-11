const Validations = require("../validations");
const rooms = require("../controllers/room.controllers.js");

module.exports = (app) => {
  const router = require("express").Router();

  router.get("/:uuid", Validations.common.isValidParamsUUID, rooms.get);
  router.post("/", rooms.create);
  router.post("/startgame", Validations.common.authMiddleware, rooms.startgame);

  app.use('/api/v1/rooms', router);
};
