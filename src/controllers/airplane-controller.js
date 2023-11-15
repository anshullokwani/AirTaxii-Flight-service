const StatusCodes = require('http-status-codes');
const { AirplaneService } = require('../services');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

/**
 * POST : /airplanes
 * request - body {modelNumber: 'airbus320', capacity: 200}
 */
async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

/**
 * GET : /airplanes/
 */
async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

/**
 * GET : /airplanes/:id
 */
async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}


/**
 * DELETE : /airplanes/:id
 */
async function destroyAirplane(req, res) {
    try {
        const airplane = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        console.log("error = ", error);
        console.log("ErrorResponse = ", ErrorResponse);
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}