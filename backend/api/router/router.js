const express = require('express');
const router = express.Router();
const { getCarByID } = require('../controller/controller');

router.get('/voiture/:id', getCarByID);

module.exports = router;