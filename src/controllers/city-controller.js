const StatusCodes = require('http-status-codes');
const { CityService } = require('../services');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

/**
 * POST : /city/
 * request - body {name: 'Kota'}
 */
async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name
        });
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

/**
 * GET : /city/
 */
async function getCities(req, res) {
    try {
        const city = await CityService.getCities();
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

/**
 * GET : /city/:id
 */
async function getCity(req, res) {
    try {
        const city = await CityService.getCity(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}


/**
 * DELETE : /city/:id
 */
async function destroyCity(req, res) {
    try {
        const city = await CityService.destroyCity(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}


/**
 * PATCH : /city/:id
 */
async function updateCity(req, res) {
    try {
        const city = await CityService.updateCity(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}


module.exports = {
    createCity,
    updateCity,
    destroyCity,
    getCities,
    getCity
}