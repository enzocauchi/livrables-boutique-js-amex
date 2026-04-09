// Sélection de la grille où seront ajoutées les cartes
const grid = document.querySelector('.grid');
const resultsText = document.querySelector('.results');

// Fonction pour créer une carte HTML pour un véhicule
function createCard(car) {
    // Déterminer le badge selon la rareté (optionnel)
    const rarity = car.rarity || 'LÉGENDAIRE'; // par défaut
    const badgeClass = rarity.toLowerCase();

    const card = document.createElement('div');
    card.className = 'card';

    // Badge
    const badge = document.createElement('span');
    badge.className = `badge ${badgeClass}`;
    badge.textContent = rarity.toUpperCase();
    card.appendChild(badge);

    // Image
    const img = document.createElement('img');
    img.src = car.image_url.startsWith('http') ? car.image_url : `/static/${car.image_url}`;
    img.alt = car.nom_modele;
    card.appendChild(img);

    // Contenu
    const content = document.createElement('div');
    content.className = 'content';

    const title = document.createElement('h3');
    title.textContent = car.nom_modele;
    content.appendChild(title);

    const desc = document.createElement('p');
    desc.textContent = car.description || 'Description non disponible...';
    content.appendChild(desc);

    // Note (optionnel)
    const rating = document.createElement('div');
    rating.className = 'rating';
    rating.textContent = `⭐ ${car.rating || '4.9'} (${car.reviews || 0})`;
    content.appendChild(rating);

    // Bas de carte : prix + bouton
    const bottom = document.createElement('div');
    bottom.className = 'bottom';

    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = `¥${car.price || '0'}`;
    bottom.appendChild(price);

    const btn = document.createElement('button');
    btn.textContent = 'ACQUÉRIR';
    btn.disabled = car.locked || false;
    bottom.appendChild(btn);

    content.appendChild(bottom);
    card.appendChild(content);

    // Si véhicule verrouillé
    if (car.locked) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.textContent = '🔒 INDISPONIBLE';
        card.appendChild(overlay);
        card.classList.add('locked');
    }

    return card;
}

// Fonction pour récupérer les véhicules depuis l'API
async function fetchCars() {
    try {
        // Pour toutes les voitures, on peut créer une route /api/voitures
        const response = await fetch('/api/voitures');
        const cars = await response.json();

        // Mettre à jour le texte du nombre d'objets trouvés
        resultsText.textContent = `${cars.length} OBJETS TROUVÉS`;

        // Vider la grille avant de remplir
        grid.innerHTML = '';

        // Ajouter chaque voiture dans la grille
        cars.forEach(car => {
            const card = createCard(car);
            grid.appendChild(card);
        });
    } catch (err) {
        console.error('Erreur lors du fetch des voitures :', err);
        grid.innerHTML = '<p>Impossible de charger les véhicules.</p>';
    }
}

// Appel initial pour afficher les voitures
fetchCars();