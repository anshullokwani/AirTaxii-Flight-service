const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddleware } = require('../../middlewares')
const router = express.Router();

// endpoint - '/api/v1/airplane' POST
router.post('/',  
    AirplaneMiddleware.validateCreateRequest,
    AirplaneController.createAirplane);


// endpoint - '/api/v1/airplane' GET
router.get('/',
    AirplaneController.getAirplanes)


// endpoint - '/api/v1/airplane/:id' GET
router.get('/:id',
    AirplaneController.getAirplane)


// endpoint - '/api/v1/airplane/:id' DELETE
router.delete('/:id',
    AirplaneController.destroyAirplane)


// endpoint - '/api/v1/airplane/:id' PUT
router.patch('/:id',
    AirplaneController.updateAirplane)

module.exports = router;