const express = require('express');
const router = express.Router();
const infoController = require('../../controllers/info-controller');
const airplaneRoutes = require('./airplane-routes');

router.use('/airplanes', airplaneRoutes);

router.get('/info', infoController.info);

module.exports = router;