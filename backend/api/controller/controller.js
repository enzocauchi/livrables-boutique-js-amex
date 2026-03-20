const { getCarById } = require('../model/model');

const getCarByID = (req, res) => {
    const { id } = req.params;

    // ✅ Vérification à l'entrée
    if (!id || isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'ID invalide' });
    }

    try {
        const car = getCarById(Number(id)); // plus de await

        // ✅ Vérification à la sortie
        if (!car) {
            return res.status(404).json({ error: 'Voiture non trouvée' });
        }

        res.status(200).json(car);

} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur', detail: err.message }); // 👈 ajoute detail
}


};

module.exports = { getCarByID };