const API_CANDIDATES = BoutiqueApp.API_ROOTS.map((root) => `${root}/api/voitures`);

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
    let cars = catalogueCars.filter((car) => {
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
        const variant = car.variantes?.find((item) => item.nom === 'De base') || car.variantes?.[0];
        const card = document.createElement('article');
        card.className = 'catalog-card';
        card.innerHTML = `
            <img src="${getAssetUrl(car.image_url || variant?.image_url)}" alt="${car.nom_modele}">
            <div class="catalog-body">
                <h3>${car.nom_modele}</h3>
                <p>${car.constructeur || 'Constructeur inconnu'} • ${car.categorie || 'Vehicule'}</p>
                <div class="catalog-meta">
                    <span>${car.variantes?.length || 0} couleurs</span>
                    <strong>¥${BoutiqueApp.formatPrice(car.prix)}</strong>
                </div>
                <div class="catalog-actions">
                    <button type="button">Ajouter</button>
                    <a href="vehicle.html?id=${car.id}">Voir</a>
                </div>
            </div>
        `;

        card.querySelector('button').addEventListener('click', () => {
            BoutiqueApp.addToCart(
                {
                    ...car,
                    image_url: variant?.image_url || car.image_url
                },
                variant?.nom || 'De base'
            );
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
searchInput.addEventListener('input', renderCatalogue);
sortSelect.addEventListener('change', renderCatalogue);
fetchCars();
