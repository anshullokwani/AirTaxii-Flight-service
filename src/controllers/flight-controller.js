const StatusCodes = require('http-status-codes');
const { FlightService } = require('../services');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

/**
 * POST : /flight/
 * request - body 
 *      {
            flightNumber: 1,
            airplaneId: XYZ555,
            arrivalAirportId: 'JAI',
            departureAirportId: 'BLR',
            arrivalTime: 00:45,
            departureTime: 22:10,
            boardingGate: G2,
            price: 9780,
            totalSeats: 180
        }
 */
async function createFlight(req, res) {
    try {
        console.log("start- fl-controller-create");
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            arrivalAirportId: req.body.arrivalAirportId,
            departureAirportId: req.body.departureAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            boardingGate: req.body.boardingGate,
            price: req.body.price,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
        console.log("end- fl-controller-create");
        return res.status(StatusCodes.CREATED)
        .json(SuccessResponse);
    } catch(error) {
        console.log("error - fl-controller-create", error);
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

/**
 * GET : /flight/
 */
async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}



/**
 * GET : /flight/
 */
async function getFlight(req, res) {
    try {
        const flights = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flights;
        return res.status(StatusCodes.OK)
        .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}


module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}