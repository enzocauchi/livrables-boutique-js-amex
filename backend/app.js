const path = require("path");
const express = require('express');
const app = express();
const router = require('./api/router/router');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

// Le dossier static est a la racine du projet, pas dans backend/.
app.use("/static", express.static(path.join(__dirname, "..", "static")));

// Parser le JSON dans les requêtes
app.use(express.json());

// Utiliser le router pour les routes API
app.use('/api', router); // → GET /api/voiture/:id

// Lancer le serveur sur le port 8080
app.listen(8080, () => {
    console.log('Serveur lancé sur le port 8080');
});
