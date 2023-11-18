const express = require('express');
const router = express.Router();
const airplaneRoutes = require('./airplane-routes');
const cityRoutes = require('./city-routes');
const airportRoutes = require('./airport-routes');
const flightRoutes = require('./flight-routes');

router.use('/airplane', airplaneRoutes);

router.use('/city', cityRoutes);

router.use('/airport', airportRoutes);

router.use('/flight', flightRoutes);

module.exports = router;