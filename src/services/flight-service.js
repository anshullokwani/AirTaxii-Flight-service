const { FlightRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { compareTime } = require('../utils/helpers/date-time-helpers');
const flightRepository = new FlightRepository();

function validateRequest(data) {
    if(!compareTime(data.arrivalTime, data.departureTime)) {
        throw new AppError("Cannot create a new Flight object because arrival time is before departure time", StatusCodes.BAD_REQUEST);
    }
}

async function createFlight(data) {
    try {
        validateRequest(data);
        const flight = await flightRepository.create(data);
        return flight;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new Flight object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    if(query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        if(arrivalAirportId == departureAirportId) {
            throw new AppError("arrivalAirportId is same as departureAirportId", StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    try {
        const flights = FlightRepository.getAllFlights(customFilter);
        return flights;
    } catch(error) {
        throw new AppError("cannot fetch data of flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights
}