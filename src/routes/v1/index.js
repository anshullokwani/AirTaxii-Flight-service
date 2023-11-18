const express = require('express');
const router = express.Router();
const infoController = require('../../controllers/info-controller');
const airplaneRoutes = require('./airplane-routes');
const cityRoutes = require('./city-routes');

router.use('/airplane', airplaneRoutes);

router.use('/city', cityRoutes);

router.get('/info', infoController.info);

module.exports = router;