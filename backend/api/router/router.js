// api/router/router.js
const express = require("express");
const router = express.Router();
const carController = require("../controller/controller");

// Change carController.getCarByID par carController.getCarDetails
router.get("/voiture/:id", carController.getCarDetails);
router.get("/voitures", carController.getAllCars);

router.get('/voitures', async (req, res) => {
    try {
        const cars = await CarModel.getAllCars();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
