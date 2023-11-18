const { AirportRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError("Cannot create a new Airport object", StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new Airport object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airport = await airportRepository.getAll();
        return airport;
    } catch(error) {
        throw new AppError("Cannot fetch Airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The Airport you requested is not present', error.statusCode)
        }
        throw new AppError("Cannot fetch Airport with id = " + id, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id) {
    try {
        const airport = await airportRepository.destroy(id);
        return airport;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The Airport you are trying to destroy is not present", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot destroy Airport with id", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function updateAirport(id) {
    try {
        const airport = await airportRepository.update(id);
        return airport;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The Airport you are trying to update is not present", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot update Airport with id", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}