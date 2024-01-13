const express = require("express");
const cors = require("cors");

const settings = require("./settings.js");
const db = require("./models");
const app = express();

// connect database, models
db.init();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/room.routes")(app);
require("./routes/player.routes")(app);

app.listen(settings.db.BACKEND_PORT, () => {
  console.log(`Server is running on port ${settings.db.BACKEND_PORT}.`);
});
