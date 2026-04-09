const db = require('../database/connection');

exports.getCarByID = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                vehicules.*,
                categories.nom AS categorie,
                constructeurs.nom AS constructeur
            FROM vehicules
                     LEFT JOIN categories ON vehicules.category_id = categories.id
                     LEFT JOIN constructeurs ON vehicules.constructeur_id = constructeurs.id
            WHERE vehicules.id = ?
        `;
        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

exports.getAllCars = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                vehicules.*, 
                categories.nom AS categorie, 
                constructeurs.nom AS constructeur
            FROM vehicules
            LEFT JOIN categories ON vehicules.category_id = categories.id
            LEFT JOIN constructeurs ON vehicules.constructeur_id = constructeurs.id
        `;
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};