const API_CANDIDATES = BoutiqueApp.API_ROOTS.map((root) => `${root}/api/voitures`);
const params = new URLSearchParams(window.location.search);

let activeApiBase = 'http://localhost:8080';
let catalogueCars = [];

const grid = document.querySelector('#catalogueGrid');
const searchInput = document.querySelector('#catalogSearch');
const sortSelect = document.querySelector('#sortSelect');

function getAssetUrl(path) {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    const normalizedPath = path.startsWith('static/')
        ? path.slice('static/'.length)
        : path.replace(/^\/+/, '');

    return `${activeApiBase}/static/${normalizedPath}`;
}

function getFilteredCars() {
    const query = searchInput.value.trim().toLowerCase();
    const favoritesOnly = params.get('view') === 'favorites';
    let cars = catalogueCars.filter((car) => {
        if (favoritesOnly && !BoutiqueApp.isFavorite(car.id)) {
            return false;
        }

        if (!query) return true;
        const haystack = [
            car.nom_modele,
            car.constructeur,
            ...(car.variantes || []).map((variant) => variant.nom)
        ].join(' ').toLowerCase();
        return haystack.includes(query);
    });

    if (sortSelect.value === 'price-asc') {
        cars = [...cars].sort((a, b) => Number(a.prix) - Number(b.prix));
    } else if (sortSelect.value === 'price-desc') {
        cars = [...cars].sort((a, b) => Number(b.prix) - Number(a.prix));
    } else if (sortSelect.value === 'name-asc') {
        cars = [...cars].sort((a, b) => a.nom_modele.localeCompare(b.nom_modele));
    }

    return cars;
}

function renderCatalogue() {
    const cars = getFilteredCars();
    grid.innerHTML = '';

    if (!cars.length) {
        grid.innerHTML = '<p>Aucun vehicule disponible avec ces criteres.</p>';
        return;
    }

    cars.forEach((car) => {
        const variant = BoutiqueApp.getDefaultVariant(car);
        const imageUrl = BoutiqueApp.getPrimaryImage(car, 'De base');
        const favoriteState = BoutiqueApp.isFavorite(car.id);
        const card = document.createElement('article');
        card.className = 'catalog-card';
        card.innerHTML = `
            <button class="favorite-button catalog-favorite${favoriteState ? ' is-active' : ''}" type="button" aria-label="Ajouter aux favoris">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 20.5l-7.2-7.1a4.6 4.6 0 0 1 6.5-6.5L12 7.6l0.7-0.7a4.6 4.6 0 1 1 6.5 6.5z"></path>
                </svg>
            </button>
            <img src="${getAssetUrl(imageUrl || car.image_url)}" alt="${car.nom_modele}">
            <div class="catalog-body">
                <h3>${car.nom_modele}</h3>
                <p>${car.constructeur || 'Constructeur inconnu'} • ${car.categorie || 'Vehicule'}</p>
                <div class="catalog-meta">
                    <span>${car.variantes?.length || 0} couleurs</span>
                    <strong>¥${BoutiqueApp.formatPrice(BoutiqueApp.getVariantPrice(car.prix, variant?.nom || 'De base'))}</strong>
                </div>
                <div class="catalog-actions">
                    <button class="add-cart-button" type="button">Ajouter</button>
                    <a href="vehicle.html?id=${car.id}">Voir</a>
                </div>
            </div>
        `;

        card.querySelector('.add-cart-button').addEventListener('click', () => {
            const currentVariant = variant?.nom || 'De base';
            BoutiqueApp.addToCart(
                {
                    ...car,
                    prix: BoutiqueApp.getVariantPrice(car.prix, currentVariant),
                    image_url: imageUrl || car.image_url
                },
                currentVariant
            );
        });

        card.querySelector('.catalog-favorite').addEventListener('click', (event) => {
            event.stopPropagation();
            const nextState = BoutiqueApp.toggleFavorite(car.id);
            event.currentTarget.classList.toggle('is-active', nextState);
            BoutiqueApp.updateFavoriteCount();
            if (params.get('view') === 'favorites') {
                renderCatalogue();
            }
        });

        grid.appendChild(card);
    });
}

async function fetchCars() {
    let lastError = null;

    for (const url of API_CANDIDATES) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            catalogueCars = await response.json();
            const parsedUrl = new URL(url);
            activeApiBase = `${parsedUrl.protocol}//${parsedUrl.host}`;
            renderCatalogue();
            return;
        } catch (error) {
            lastError = error;
        }
    }

    grid.innerHTML = `<p>Impossible de charger le catalogue : ${lastError?.message || 'Erreur inconnue'}</p>`;
}

BoutiqueApp.applySavedTheme();
BoutiqueApp.initThemeToggle();
BoutiqueApp.updateCartCount();
BoutiqueApp.updateFavoriteCount();
searchInput.addEventListener('input', renderCatalogue);
sortSelect.addEventListener('change', renderCatalogue);
fetchCars();
