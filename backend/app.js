const path = require("path");
const express = require('express');
const app = express();
const router = require('./api/router/router');

// Rendre le dossier static accessible
app.use("/static", express.static(path.join(__dirname, "static")));

// Parser le JSON dans les requêtes
app.use(express.json());

// Utiliser le router pour les routes API
app.use('/api', router); // → GET /api/voiture/:id

// Lancer le serveur sur le port 8080
app.listen(8080, () => {
    console.log('Serveur lancé sur le port 8080');
});