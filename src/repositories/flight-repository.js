const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require('../models');
const Sequelize = require('sequelize');
class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetails'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        });
        return response;
    }

    async updateRemainingSeats(flightId, seats, decrease = 1) {
        const flight = await Flight.findByPk(flightId);
        let dec = parseInt(decrease);
        if(dec) {
            const response = await flight.decrement('totalSeats', {by: seats});
            return response;
        } else {
            const response = await flight.increment('totalSeats', {by: seats});
            return response;
        }
    }
}



module.exports = FlightRepository;