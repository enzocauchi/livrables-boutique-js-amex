const mysql = require('mysql2');

const connexion = mysql.createConnection({
    host: '127.0.0.1', // On utilise l'IP pour éviter les soucis de résolution localhost
    user: 'root',
    password: 'root',
    database: 'voiture_cyberpunk',
    port: 3306 // On teste le port standard
});

connexion.connect((err) => {
    if (err) {
        console.error("❌ Erreur de connexion :", err.message);
        return;
    }
    console.log("✅ Connecté à MySQL");

    // ON DEMANDE LA LISTE DES TABLES RÉELLES
    connexion.query("SHOW TABLES", (err, rows) => {
        if (err) {
            console.error("❌ Erreur SHOW TABLES :", err.message);
        } else {
            console.log("📂 Tables trouvées par Node.js dans cette base :");
            console.table(rows);
        }
    });
});

module.exports = connexion;