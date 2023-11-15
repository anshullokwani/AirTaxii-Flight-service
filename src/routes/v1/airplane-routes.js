const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddleware } = require('../../middlewares')
const router = express.Router();

// endpoint - '/api/v1/airplanes' POST
router.post('/',  
    AirplaneMiddleware.validateCreateRequest,
    AirplaneController.createAirplane);


// endpoint - '/api/v1/airplanes' GET
router.get('/',
    AirplaneController.getAirplanes)


// endpoint - '/api/v1/airplanes/:id' GET
router.get('/:id',
    AirplaneController.getAirplane)


// endpoint - '/api/v1/airplanes/:id' DELETE
router.delete('/:id',
    AirplaneController.destroyAirplane)

module.exports = router;