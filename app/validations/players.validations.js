const { body, header } = require("express-validator");
const {VALIDATION_ERROR_MSG} = require("./dictionary");
const uuid = require('uuid');
const createDataValidate = [
    body("username")
        .notEmpty().withMessage(VALIDATION_ERROR_MSG.REQUIRED).bail()
        .isString().withMessage(VALIDATION_ERROR_MSG.IS_STRING).bail()
        .trim()
        .notEmpty().withMessage(VALIDATION_ERROR_MSG.REQUIRED).bail()
        .isLength({ min: 2, max: 30 }).withMessage(VALIDATION_ERROR_MSG.OUT_OF_RANGE),
    // body("room_id")
    //     .notEmpty().withMessage(VALIDATION_ERROR_MSG.REQUIRED).bail()
    //     .isString().withMessage(VALIDATION_ERROR_MSG.IS_STRING).bail()
    //     .custom((value, { req }) => {
    //         return uuid.validate(req.body.room_id);
    //     }).withMessage(VALIDATION_ERROR_MSG.NOT_VALID_UUID).bail()
];

module.exports = { createDataValidate }; //
