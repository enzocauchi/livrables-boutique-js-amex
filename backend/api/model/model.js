const db = require('../database/connection');

/**
 * Récupère un véhicule spécifique par son ID avec sa catégorie,
 * son constructeur et la liste de ses variantes.
 */
exports.getCarByID = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                v.*,
                c.nom AS categorie,
                con.nom AS constructeur,
                GROUP_CONCAT(var.nom) AS variantes
            FROM vehicules v
                     LEFT JOIN categories c ON v.category_id = c.id
                     LEFT JOIN constructeurs con ON v.constructeur_id = con.id
                     LEFT JOIN variantes var ON v.id = var.vehicule_id
            WHERE v.id = ?
            GROUP BY v.id
        `;

        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);

            if (results[0]) {
                // On transforme la chaîne "Bleu,De base,Vert" en véritable tableau JS
                results[0].variantes = results[0].variantes ? results[0].variantes.split(',') : [];
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
};

/**
 * Récupère la liste de tous les véhicules avec leurs détails
 * et leurs variantes respectives.
 */
exports.getAllCars = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                v.*,
                c.nom AS categorie,
                con.nom AS constructeur,
                GROUP_CONCAT(var.nom) AS variantes
            FROM vehicules v
                     LEFT JOIN categories c ON v.category_id = c.id
                     LEFT JOIN constructeurs con ON v.constructeur_id = con.id
                     LEFT JOIN variantes var ON v.id = var.vehicule_id
            GROUP BY v.id
        `;

        db.query(sql, (err, results) => {
            if (err) return reject(err);

            // Pour chaque véhicule, on transforme la string des variantes en tableau
            const formattedResults = results.map(car => ({
                ...car,
                variantes: car.variantes ? car.variantes.split(',') : []
            }));

            resolve(formattedResults);
        });
    });
};