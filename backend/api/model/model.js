const db = require('../../db');

const getCarById = (id) => {
    const stmt = db.prepare('SELECT * FROM vehicules WHERE id = ?');
    return stmt.get(id); // retourne l'objet directement, ou undefined si pas trouvé
};

module.exports = { getCarById };