const express = require('express');
const deviceController = require('../controllers/deviceController');
const smsController = require('../controllers/smsController');

const router = express.Router();

// Endpoints
router.post('/new_device', deviceController.registerDevice);
router.post('/new_sms', smsController.processSms);

module.exports = router;
