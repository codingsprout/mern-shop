const express = require('express');
const { startingData } = require('../../controller/admin/startingData');
const router = express.Router();

router.post('/startingdata', startingData)

module.exports = router;