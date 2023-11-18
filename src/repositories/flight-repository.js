const CrudRepository = require("./crud-repository");
const { Flight } = require('../models')

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter) {
        const response = await Flight.findAll({
            where: filter
        })
    }
}



module.exports = FlightRepository;