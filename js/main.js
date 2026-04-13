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
    const defaultVariant = BoutiqueApp.getDefaultVariant(car);
    const defaultImage = BoutiqueApp.getPrimaryImage(car, 'De base');
    const isFavorite = BoutiqueApp.isFavorite(car.id);
    const finalPrice = BoutiqueApp.getFinalPrice(car.prix, defaultVariant?.nom || 'De base', car.promotion_percent);

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

    const favoriteButton = document.createElement('button');
    favoriteButton.type = 'button';
    favoriteButton.className = `favorite-button card-favorite${isFavorite ? ' is-active' : ''}`;
    favoriteButton.setAttribute('aria-label', 'Ajouter aux favoris');
    favoriteButton.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20.5l-7.2-7.1a4.6 4.6 0 0 1 6.5-6.5L12 7.6l0.7-0.7a4.6 4.6 0 1 1 6.5 6.5z"></path>
        </svg>
    `;
    favoriteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const nextState = BoutiqueApp.toggleFavorite(car.id);
        favoriteButton.classList.toggle('is-active', nextState);
    });
    card.appendChild(favoriteButton);

    const img = document.createElement('img');
    img.src = getAssetUrl(defaultImage || car.image_url);
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
    rating.textContent = `${Array.isArray(car.variantes) ? car.variantes.length : 0} variantes • Stock ${car.stock_quantity}`;
    content.appendChild(rating);

    const bottom = document.createElement('div');
    bottom.className = 'bottom';

    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = `¥${BoutiqueApp.formatPrice(finalPrice)}`;
    bottom.appendChild(price);

    if (Number(car.promotion_percent || 0) > 0) {
        const promo = document.createElement('span');
        promo.className = 'promo-chip';
        promo.textContent = `-${car.promotion_percent}%`;
        bottom.appendChild(promo);
    }

    const btn = document.createElement('button');
    btn.className = 'card-action';
    btn.type = 'button';
    btn.textContent = Number(car.stock_quantity) > 0 ? 'Ajouter' : 'Rupture';
    btn.disabled = Number(car.stock_quantity) <= 0;
    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        const variant = defaultVariant?.nom || 'De base';
        BoutiqueApp.addToCart(
            {
                ...car,
                base_price: Number(car.prix),
                promotion_percent: Number(car.promotion_percent || 0),
                prix: BoutiqueApp.getFinalPrice(car.prix, variant, car.promotion_percent),
                image_url: defaultImage || car.image_url
            },
            variant
        );
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
    console.log('Rendering cars, count=', cars.length);
    resultsText.textContent = `${cars.length} OBJETS TROUVÉS`;
    grid.innerHTML = '';

    if (!cars.length) {
        grid.innerHTML = '<p>Aucun vehicule ne correspond a ce filtre.</p>';
        return;
    }

    cars.forEach((car) => {
        try {
            grid.appendChild(createCard(car));
        } catch (err) {
            console.error('Error rendering car', car && car.id, err);
        }
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
            console.log('Fetched cars from', url, 'count=', Array.isArray(allCars) ? allCars.length : 0);
            const parsedUrl = new URL(url);
            activeApiBase = `${parsedUrl.protocol}//${parsedUrl.host}`;
            refreshGrid();
            return;
        } catch (error) {
            lastError = error;
        }
    }

    window.location.href = `api-error.html?message=${encodeURIComponent(lastError?.message || 'Erreur API')}`;
}

BoutiqueApp.applySavedTheme();
BoutiqueApp.initThemeToggle();
BoutiqueApp.updateCartCount();
BoutiqueApp.updateFavoriteCount();
setupFilters();
fetchCars();
