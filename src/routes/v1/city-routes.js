const express = require('express');
const { CityController } = require('../../controllers');
const { CityMiddleware } = require('../../middlewares')
const router = express.Router();

// endpoint - '/api/v1/city' POST
router.post('/',  
    CityMiddleware.validateCreateRequest,
    CityController.createCity);


// endpoint - '/api/v1/city' GET
router.get('/',
    CityController.getCities)


// endpoint - '/api/v1/city/:id' GET
router.get('/:id',
    CityController.getCity)


// endpoint - '/api/v1/city/:id' DELETE
router.delete('/:id',
    CityController.destroyCity)


// endpoint - '/api/v1/city/:id' PUT
router.patch('/:id',
    CityController.updateCity)

module.exports = router;