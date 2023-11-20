const express = require('express');
const { FlightController } = require('../../controllers');
const { FlightMiddleware } = require('../../middlewares')
const router = express.Router();

// endpoint - '/api/v1/flight' POST
router.post('/',  
    FlightMiddleware.validateCreateRequest,
    FlightController.createFlight);


// endpoint - '/api/v1/flight' GET
router.get('/',
    FlightController.getAllFlights)
    

    
// endpoint - '/api/v1/flight/:id' GET
router.get('/:id',
    FlightController.getFlight)


/*



// endpoint - '/api/v1/flight/:id' DELETE
router.delete('/:id',
    FlightController.destroyAirport)


// endpoint - '/api/v1/flight/:id' PUT
router.patch('/:id',
    FlightController.updateAirport)

*/
module.exports = router;