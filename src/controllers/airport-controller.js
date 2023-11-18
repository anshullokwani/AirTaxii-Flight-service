const StatusCodes = require('http-status-codes');
const { AirportService } = require('../services');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

/**
 * POST : /airport/
 * request - body 
 *      {
            name: 'Jaipur International Airport,
            code: 'JAI',
            address: 'something',
            cityId: 2,
        }
 */
async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        });
        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

/**
 * GET : /airport/
 */
async function getAirports(req, res) {
    try {
        const airport = await AirportService.getAirports();
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

/**
 * GET : /airport/:id
 */
async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}


/**
 * DELETE : /airport/:id
 */
async function destroyAirport(req, res) {
    try {
        const airport = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}


/**
 * PATCH : /airport/:id
 */
async function updateAirport(req, res) {
    try {
        const airport = await AirportService.updateAirport(req.params.id);
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}


module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}