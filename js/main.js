const API_CANDIDATES = BoutiqueApp.API_ROOTS.map((root) => `${root}/api/voitures`);

let activeApiBase = 'http://localhost:8080';
let allCars = [];
let activeBrand = 'Tous';

const grid = document.querySelector('.grid');
const resultsText = document.querySelector('.results');
const searchInput = document.querySelector('#searchInput');
const brandFilters = document.querySelector('#brandFilters');
const activeFilterLabel = document.querySelector('#activeFilterLabel');

function getAssetUrl(path) {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    const normalizedPath = path.startsWith('static/')
        ? path.slice('static/'.length)
        : path.replace(/^\/+/, '');

    return `${activeApiBase}/static/${normalizedPath}`;
}

function matchesSearch(car, query) {
    if (!query) return true;

    const haystack = [
        car.nom_modele,
        car.constructeur,
        car.categorie,
        ...(car.variantes || []).map((variant) => variant.nom)
    ]
        .join(' ')
        .toLowerCase();

    return haystack.includes(query);
}

function getVisibleCars() {
    const query = searchInput.value.trim().toLowerCase();

    return allCars.filter((car) => {
        const matchesBrand = activeBrand === 'Tous' || car.constructeur === activeBrand;
        return matchesBrand && matchesSearch(car, query);
    });
}

function createCard(car) {
    const rarity = car.rarity || 'LÉGENDAIRE';
    const badgeClass = rarity.toLowerCase();
    const defaultVariant = Array.isArray(car.variantes)
        ? car.variantes.find((variant) => variant.nom === 'De base') || car.variantes[0]
        : null;

    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;

    const openDetails = (event) => {
        if (event.target.closest('.card-action')) {
            return;
        }

        window.location.href = `vehicle.html?id=${car.id}`;
    };

    card.addEventListener('click', openDetails);
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openDetails(event);
        }
    });

    const badge = document.createElement('span');
    badge.className = `badge ${badgeClass}`;
    badge.textContent = rarity.toUpperCase();
    card.appendChild(badge);

    const img = document.createElement('img');
    img.src = getAssetUrl(car.image_url || defaultVariant?.image_url);
    img.alt = car.nom_modele;
    card.appendChild(img);

    const content = document.createElement('div');
    content.className = 'content';

    const title = document.createElement('h3');
    title.textContent = car.nom_modele;
    content.appendChild(title);

    const desc = document.createElement('p');
    desc.textContent = `${car.constructeur || 'Constructeur inconnu'} • ${car.categorie || 'Categorie inconnue'}`;
    content.appendChild(desc);

    const rating = document.createElement('div');
    rating.className = 'rating';
    rating.textContent = `${Array.isArray(car.variantes) ? car.variantes.length : 0} variantes disponibles`;
    content.appendChild(rating);

    const bottom = document.createElement('div');
    bottom.className = 'bottom';

    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = `¥${BoutiqueApp.formatPrice(car.prix)}`;
    bottom.appendChild(price);

    const btn = document.createElement('button');
    btn.className = 'card-action';
    btn.type = 'button';
    btn.textContent = 'Ajouter';
    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        const variant = defaultVariant?.nom || 'De base';
        BoutiqueApp.addToCart(car, variant);
        btn.textContent = 'Ajoute';
        window.setTimeout(() => {
            btn.textContent = 'Ajouter';
        }, 1200);
    });
    bottom.appendChild(btn);

    content.appendChild(bottom);
    card.appendChild(content);
    return card;
}

function renderCars(cars) {
    resultsText.textContent = `${cars.length} OBJETS TROUVÉS`;
    grid.innerHTML = '';

    if (!cars.length) {
        grid.innerHTML = '<p>Aucun vehicule ne correspond a ce filtre.</p>';
        return;
    }

    cars.forEach((car) => {
        grid.appendChild(createCard(car));
    });
}

function refreshGrid() {
    activeFilterLabel.textContent = activeBrand === 'Tous'
        ? 'Tous les constructeurs'
        : activeBrand;
    renderCars(getVisibleCars());
}

function setupFilters() {
    brandFilters.addEventListener('click', (event) => {
        const button = event.target.closest('.filter-pill');
        if (!button) return;

        activeBrand = button.dataset.brand;
        brandFilters.querySelectorAll('.filter-pill').forEach((pill) => {
            pill.classList.toggle('active', pill === button);
        });
        refreshGrid();
    });

    searchInput.addEventListener('input', refreshGrid);
}

async function fetchCars() {
    let lastError = null;

    for (const url of API_CANDIDATES) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            allCars = await response.json();
            const parsedUrl = new URL(url);
            activeApiBase = `${parsedUrl.protocol}//${parsedUrl.host}`;
            refreshGrid();
            return;
        } catch (error) {
            lastError = error;
        }
    }

    resultsText.textContent = 'ERREUR DE CHARGEMENT';
    grid.innerHTML = `<p>Impossible de charger les vehicules : ${lastError?.message || 'Erreur inconnue'}</p>`;
}

BoutiqueApp.applySavedTheme();
BoutiqueApp.initThemeToggle();
BoutiqueApp.updateCartCount();
setupFilters();
fetchCars();
