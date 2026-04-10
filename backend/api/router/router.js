// api/router/router.js
const express = require("express");
const router = express.Router();
const carController = require("../controller/controller");

// On garde uniquement ces deux là
router.get("/voiture/:id", carController.getCarDetails);
router.get("/voitures", carController.getAllCars);
router.post("/commandes", carController.createOrder);

module.exports = router;
