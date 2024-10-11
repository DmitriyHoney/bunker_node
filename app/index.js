const express = require("express");
const { socketInit, actions } = require("./socket")
const http = require('node:http');
const cors = require("cors");
const settings = require("./settings.js");
const db = require("./models");

const app = express();
const server = http.createServer(app);
const io = socketInit(server);

db.init();

app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  req.io = io;
  req.socketActions = actions(io);
  next();
})
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ message: "Welcome to bezkoder application." }));
require("./routes/room.routes")(app);
require("./routes/player.routes")(app);

server.listen(settings.db.BACKEND_PORT, () => {
  console.log(`Server is running on port ${settings.db.BACKEND_PORT}.`);
});
