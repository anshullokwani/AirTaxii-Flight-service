const { FlightRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');
const { compareTime } = require('../utils/helpers/date-time-helpers');
const flightRepository = new FlightRepository();

function validateRequest(data) {
    if(!compareTime(data.arrivalTime, data.departureTime)) {
        throw new AppError("Cannot create a new Flight object because arrival time is before departure time", StatusCodes.BAD_REQUEST);
    }
}

async function createFlight(data) {
    try {
        // validateRequest(data);
        console.log("before-create");
        const flight = await flightRepository.create(data);
        console.log("after-create");
        return flight;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        console.log("error-create", error);
        throw new AppError("Cannot create a new Flight object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let sortFilter = [];
    let customFilter = getCustomFilter(query, sortFilter);
    try {
        const flights = flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch(error) {
        throw new AppError("cannot fetch data of flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch(error) {
        throw new AppError("cannot fetch data of flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


function getCustomFilter(query, sortFilter) {
    let customFilter = {};
    const endingTripTime = " 23:59:59";
    if(query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        if(arrivalAirportId == departureAirportId) {
            throw new AppError("arrivalAirportId is same as departureAirportId", StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, maxPrice]
        }
    }
    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: [query.travellers]
        }
    }
    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if(query.sort) {
        
        const params = query.sort.split(",");
        sortFilter = params.map((param) => param.split("_"));
    }
    console.log(customFilter);
    return customFilter; 
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}