const express = require('express');
const { AirportController } = require('../../controllers');
const { AirportMiddleware } = require('../../middlewares')
const router = express.Router();

// endpoint - '/api/v1/airport' POST
router.post('/',  
    AirportMiddleware.validateCreateRequest,
    AirportController.createAirport);


// endpoint - '/api/v1/airport' GET
router.get('/',
    AirportController.getAirports)


// endpoint - '/api/v1/airport/:id' GET
router.get('/:id',
    AirportController.getAirport)


// endpoint - '/api/v1/airport/:id' DELETE
router.delete('/:id',
    AirportController.destroyAirport)


// endpoint - '/api/v1/airport/:id' PUT
router.patch('/:id',
    AirportController.updateAirport)

module.exports = router;