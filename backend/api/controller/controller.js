// api/controller/controller.js
const CarModel = require('../model/model');

exports.getCarDetails = async (req, res) => {
    const id = req.params.id;

    // 1. Validation de l'entrée
    if (isNaN(id)) {
        return res.status(400).json({ error: "L'ID doit être un nombre." });
    }

    try {
        // 2. Appel au modèle
        const car = await CarModel.getCarByID(id);

        // 3. Validation de la sortie
        if (!car) {
            return res.status(404).json({ message: "Voiture non trouvée." });
        }

        res.json(car);
    } catch (err) {
        console.error(err); // ← ajoute ça pour voir l'erreur réelle
        res.status(500).json({ error: "Erreur lors de la récupération des données." });
    }
};

exports.getAllCars = async (req, res) => {
    try {
        const cars = await CarModel.getAllCars();
        res.json(cars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.createOrder = async (req, res) => {
    const { customerName, address, items } = req.body;

    if (!customerName || !address?.line1 || !address?.postalCode || !address?.city || !address?.country) {
        return res.status(400).json({ error: "Adresse de livraison incomplete." });
    }

    if (!Array.isArray(items) || !items.length) {
        return res.status(400).json({ error: "Le panier est vide." });
    }

    try {
        const order = await CarModel.createOrder({ customerName, address, items });
        res.status(201).json(order);
    } catch (err) {
        console.error(err);

        if (String(err.message).startsWith('OUT_OF_STOCK_')) {
            return res.status(409).json({ error: "Stock insuffisant pour au moins un vehicule." });
        }

        if (err.message === 'EMPTY_ORDER') {
            return res.status(400).json({ error: "Le panier est vide." });
        }

        res.status(500).json({ error: "Erreur lors de la creation de la commande." });
    }
};
