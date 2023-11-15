const express = require('express');
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddleware } = require('../../middlewares')
const router = express.Router();

// endpoint - '/api/v1/airplanes' POST
router.post('/',  
    AirplaneMiddleware.validateCreateRequest,
    AirplaneController.createAirplane);

router.get('/',
    AirplaneController.getAirplanes)

module.exports = router;