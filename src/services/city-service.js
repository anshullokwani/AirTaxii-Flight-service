const { CityRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();


async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch(error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError("Cannot create a new City object", StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new City object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities() {
    try {
        const city = await cityRepository.getAll();
        return city;
    } catch(error) {
        throw new AppError("Cannot fetch Cities", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The City you requested is not present', error.statusCode)
        }
        throw new AppError("Cannot fetch City with id = " + id, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id) {
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The City you are trying to destroy is not present", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot destroy City with id", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function updateCity(id) {
    try {
        const city = await cityRepository.update(id);
        return city;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The City you are trying to update is not present", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Cannot update City with id", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}







module.exports = {
    createCity,
    destroyCity,
    updateCity,
    getCities,
    getCity
}