const Domain = require('../domain/index');
const Mapping = require('../mapping');

exports.get = async (req, res) => {
  const Room = await Domain.room.getRoomById(req.params.uuid);
  if (!Room) return res.status(404).json({
    errorsMessages: [{ message: "Not found" }]
  });
  // const Player = await Domain.player.createPlayerWithRoom(Room, { username: req.body.username, is_owner: true });
  return res.status(200).send(await Mapping.room.RoomInfoMap(Room));
};

exports.create = async (req, res) => {
  const Room = await Domain.room.create();
  // const Player = await Domain.player.createPlayerWithRoom(Room, { username: req.body.username, is_owner: true });
  return res.status(200).send(await Mapping.room.RoomInfoMap(Room));
};
exports.startgame = async (req, res) => {
  const Player = req.context.player;
  if (!Player.is_owner) return res.status(400).json({ msg: 'User not owner' });

  const playerRoom = await Player.getRoom();
  if (playerRoom.is_game_start) return res.status(400).json({ msg: 'Game already started' });
  if (playerRoom.is_game_end) return res.status(400).json({ msg: 'Game already end' });

  const players = await playerRoom.getPlayers();

  // if (players.length < 1) return res.status(400).json({ msg: `Room has players less than ${playerRoom.min_players}` });
  // if (players.length > playerRoom.max_players) return res.status(400).json({ msg: `Room has players more than ${playerRoom.max_players}` });

  await Domain.room.createDeck(playerRoom.id);
  playerRoom.is_game_start = true;
  playerRoom.save();
  // в рандомном порядке сгенерировать из словаря базовых карт, карты для каждого игрока
  // в каждой категории по одной, карты не должны повторяться между игроками

  // сгенерировать 1 карту катастрофы и 5 карт бункеров для комнаты

  // с полученными значениями создать модели карточек
  req.socketActions.START_GAME_IN_ROOM(playerRoom.id);
  return res.status(201).send();
};
