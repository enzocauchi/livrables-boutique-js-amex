const express = require('express');
const app = express();
const router = require('./api/router/router');

app.use(express.json());

app.use('/api', router); // → GET /api/voiture/:id

app.listen(3000, () => {
    console.log('Serveur lancé sur le port 3000');
});
