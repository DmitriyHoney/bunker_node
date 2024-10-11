const { validationResult } = require('express-validator');
const room = require('./rooms.validations');
const player = require('./players.validations');
const {VALIDATION_ERROR_MSG} = require("./dictionary");
const Domain = require("../domain/");
const uuid = require('uuid');

const validatorsErrorsMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const transformErrors = errors.array()
            .map(({ msg, path }) => ({ message: msg, field: path }));
        const errorsJSON = { errorsMessages: transformErrors };
        return res.status(400).json(errorsJSON);
    }
    next();
};

const isValidParamsUUID = async (req, res, next) => {
    const isValidUuid = uuid.validate(req.params.uuid);
    if (!isValidUuid) return res.status(400).json({
        errorsMessages: [{ message: "Not valid token" }]
    });
    else next();
}

const authMiddleware = async (req, res, next) => {
    if (!req.context) req.context = {};
    if (!req.headers.token) {
        return res.status(400).json({
            errorsMessages: [{ message: "Header not provided", field: "token" }]
        });
    }
    const isValidUuid = uuid.validate(req.headers.token);
    if (!isValidUuid) return res.status(400).json({
        errorsMessages: [{ message: "Not valid token" }]
    });
    try {
        const player = await Domain.player.getPlayerById(req.headers.token);
        if (!player) return res.status(404).json({
            errorsMessages: [{ message: "Not found" }]
        });
        req.context.player = player;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json('Server error');
    }
};

module.exports = {
    dictionary: { VALIDATION_ERROR_MSG  },
    common: { validatorsErrorsMiddleware, authMiddleware, isValidParamsUUID },
    room,
    player,
};
