const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');

function validateCreateRequest(req, res, next) {
    if(!req.body.name) {
        ErrorResponse.message = "Something went wrong";
        ErrorResponse.error = new AppError(["name not found in the incoming request", StatusCodes.BAD_REQUEST]);
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse)
    }
    next();
}

module.exports = {
    validateCreateRequest
}