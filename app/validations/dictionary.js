const VALIDATION_ERROR_MSG = {
    REQUIRED: 'Field is required',
    IS_STRING: 'Field must be a string',
    IS_NUMBER: 'Field must be a number',
    IS_BOOLEAN: 'Field must be a boolean',
    IS_URL: 'Field must be an url',
    OUT_OF_RANGE: 'Field is out of range',
    BLOG_ID_NOT_FOUND: 'Blog with blogId not found',
    LOGIN_NOT_VALID_TEMPLATE: 'Not valid pattern login',
    EMAIL_NOT_VALID_TEMPLATE: 'Not valid pattern email',
    EMAIL_OR_PASSWORD_NOT_VALID: 'Email or password not valid',
    USER_THIS_EMAIL_EXIST: 'User this email already exist',
    USER_THIS_LOGIN_EXIST: 'User this login already exist',
    NOT_VALID_UUID: 'uuid not valid',
};

module.exports = { VALIDATION_ERROR_MSG };