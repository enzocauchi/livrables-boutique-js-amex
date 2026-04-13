// api/router/router.js
const express = require("express");
const router = express.Router();
const carController = require("../controller/controller");
const authController = require('../controller/authController');

// On garde uniquement ces deux là
router.get("/voiture/:id", carController.getCarDetails);
router.get("/voitures", carController.getAllCars);
router.post("/commandes", carController.createOrder);
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

module.exports = router;
