const mysql = require('mysql2');

const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'boutique',
    port: Number(process.env.DB_PORT) || 8889
};

const connexion = mysql.createConnection(dbConfig);

connexion.connect((err) => {
    if (err) {
        console.error("❌ Erreur de connexion :", err.message);
        return;
    }
    console.log(`✅ Connecté à MySQL sur la base "${dbConfig.database}"`);

    connexion.query("SHOW TABLES", (err, rows) => {
        if (err) {
            console.error("❌ Erreur SHOW TABLES :", err.message);
        } else {
            console.log("📂 Tables trouvées dans la base active :");
            console.table(rows);
        }
    });
});

connexion.beginTransaction = function(callback) {
    this.query('START TRANSACTION', callback);
};

connexion.commit = function(callback) {
    this.query('COMMIT', callback);
};

connexion.rollback = function(callback) {
    this.query('ROLLBACK', callback);
};

module.exports = connexion;
