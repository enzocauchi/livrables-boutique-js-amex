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

// Servir les fichiers HTML et autres fichiers statiques racine
app.use(express.static(path.join(__dirname, "..")));

// Parser le JSON dans les requêtes
app.use(express.json());

// Utiliser le router pour les routes API
app.use('/api', router); // → GET /api/voiture/:id

// Fallback: servir index.html pour les routes non-API (SPA fallback)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Lancer le serveur sur le port 8080
app.listen(8080, () => {
    console.log('Serveur lancé sur le port 8080');
});
