const Mapping = require('../mapping');
const Domain = require("../domain");

exports.getMe = async (req, res) => {
  return res.status(200).send(await Mapping.player.PlayerInfoMap(req.context.player));
}

exports.create = async (req, res) => {
  const room = await Domain.room.getRoomById(req.body.room_id);
  if (!room) return res.status(404).send({ msg: 'Not found' });

  if (room.is_game_start || room.is_game_end) return res.status(400).json({ msg: 'Game already start' });

  const roomPlayers = await room.getPlayers();
  if (roomPlayers.length >= room.max_players ) return res.status(400).json('Room already full players');

  const checkUniqueNameInRoom = roomPlayers.find((p) => p.username === req.body.username);
  if (checkUniqueNameInRoom) return res.status(400).json('Player this name already exist');

  const Player = await Domain.player.createPlayerWithRoom(room, { username: req.body.username });
  return res.status(200).json(await Mapping.player.PlayerInfoMap(Player));
}