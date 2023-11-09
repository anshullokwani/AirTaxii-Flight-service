const express = require('express');
const { AirplaneController } = require('../../controllers');
const router = express.Router();

// endpoint - '/api/v1/airplanes' POST
router.post('/', AirplaneController.createAirplane);

module.express = router;