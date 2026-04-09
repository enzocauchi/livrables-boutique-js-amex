const API_CANDIDATES = BoutiqueApp.API_ROOTS.map((root) => `${root}/api`);

const page = document.querySelector('#vehiclePage');
const params = new URLSearchParams(window.location.search);
const vehicleId = params.get('id');

let activeApiBase = 'http://localhost:8080';
let currentCar = null;
let activeVariantName = 'De base';

function getAssetUrl(path) {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    const normalizedPath = path.startsWith('static/')
        ? path.slice('static/'.length)
        : path.replace(/^\/+/, '');

    return `${activeApiBase}/static/${normalizedPath}`;
}

function getVehicleLore(car) {
    return `${car.nom_modele} est un modele ${car.constructeur?.toLowerCase() || 'urbain'} concu pour les rues de Night City. Sa silhouette agressive, ses trois teintes et son profil premium en font une piece de collection autant qu'un vehicule de survie.`;
}

function getActiveVariant() {
    const variants = currentCar?.variantes || [];
    return variants.find((variant) => variant.nom === activeVariantName)
        || variants.find((variant) => variant.nom === 'De base')
        || variants[0];
}

function renderSpriteStrip(variant) {
    const strip = page.querySelector('.sprite-strip');
    const heroImage = page.querySelector('.hero-image');
    const spriteCount = page.querySelector('.sprite-count');
    const sprites = variant?.sprites?.length ? variant.sprites : [variant?.image_url || currentCar.image_url];

    heroImage.src = getAssetUrl(sprites[0]);
    heroImage.alt = `${currentCar.nom_modele} ${variant.nom}`;
    if (spriteCount) {
        spriteCount.textContent = sprites.length;
    }

    strip.innerHTML = '';

    sprites.forEach((sprite, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `sprite-card${index === 0 ? ' active' : ''}`;
        button.innerHTML = `
            <img src="${getAssetUrl(sprite)}" alt="${currentCar.nom_modele} ${variant.nom} sprite ${index + 1}">
            <span>Sprite ${index + 1}</span>
        `;

        button.addEventListener('click', () => {
            heroImage.src = getAssetUrl(sprite);
            page.querySelectorAll('.sprite-card').forEach((node) => node.classList.remove('active'));
            button.classList.add('active');
        });

        strip.appendChild(button);
    });
}

function renderColorButtons() {
    const container = page.querySelector('.color-buttons');
    container.innerHTML = '';

    (currentCar.variantes || []).forEach((variant) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `color-button${variant.nom === activeVariantName ? ' active' : ''}`;
        button.textContent = variant.nom;
        button.addEventListener('click', () => {
            activeVariantName = variant.nom;
            renderColorButtons();
            renderSpriteStrip(variant);
        });
        container.appendChild(button);
    });
}

function renderVehicle(car) {
    currentCar = car;
    activeVariantName = car.variantes?.find((variant) => variant.nom === 'De base')?.nom || car.variantes?.[0]?.nom || 'De base';

    page.innerHTML = `
        <div class="visual-panel">
            <div class="hero-card">
                <img class="hero-image" src="" alt="${car.nom_modele}">
            </div>
            <div class="sprite-strip"></div>
        </div>
        <div class="info-panel">
            <p class="collection-tag">${car.constructeur || 'Constructeur inconnu'}</p>
            <h1>${car.nom_modele}</h1>
            <p class="lead">${getVehicleLore(car)}</p>
            <div class="price-line">
                <span class="price">¥${BoutiqueApp.formatPrice(car.prix)}</span>
                <span class="availability">Disponible immediatement</span>
            </div>
            <div class="color-picker">
                <p>Choisir une couleur</p>
                <div class="color-buttons"></div>
            </div>
            <div class="actions-row">
                <button class="primary-action" type="button">Ajouter au panier</button>
                <a class="secondary-action" href="catalogue.html">Retour catalogue</a>
            </div>
            <div class="stats-grid">
                <article>
                    <span>Constructeur</span>
                    <strong>${car.constructeur || 'Inconnu'}</strong>
                </article>
                <article>
                    <span>Categorie</span>
                    <strong>${car.categorie || 'Vehicule'}</strong>
                </article>
                <article>
                    <span>Reference</span>
                    <strong>#${car.id}</strong>
                </article>
                <article>
                    <span>Sprites actifs</span>
                    <strong class="sprite-count">${getActiveVariant()?.sprites?.length || 1}</strong>
                </article>
            </div>
            <div class="detail-card">
                <h2>Informations</h2>
                <ul>
                    <li>Trois sprites consultables pour chaque finition disponible.</li>
                    <li>Tarification premium avec affichage instantane selon le modele.</li>
                    <li>Selection de couleur synchronisee avec la galerie visuelle.</li>
                </ul>
            </div>
        </div>
    `;

    page.querySelector('.primary-action').addEventListener('click', (event) => {
        const variant = getActiveVariant();
        BoutiqueApp.addToCart(
            {
                ...car,
                image_url: variant?.image_url || car.image_url
            },
            variant?.nom || 'De base'
        );

        event.currentTarget.textContent = 'Ajoute au panier';
        window.setTimeout(() => {
            event.currentTarget.textContent = 'Ajouter au panier';
        }, 1200);
    });

    renderColorButtons();
    renderSpriteStrip(getActiveVariant());
}

async function fetchVehicle() {
    if (!vehicleId) {
        page.innerHTML = '<div class="loading">Vehicule introuvable.</div>';
        return;
    }

    let lastError = null;

    for (const baseUrl of API_CANDIDATES) {
        try {
            const response = await fetch(`${baseUrl}/voiture/${vehicleId}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const car = await response.json();
            const parsedUrl = new URL(baseUrl);
            activeApiBase = `${parsedUrl.protocol}//${parsedUrl.host}`;
            renderVehicle(car);
            return;
        } catch (error) {
            lastError = error;
        }
    }

    page.innerHTML = `<div class="loading">Impossible de charger ce vehicule : ${lastError?.message || 'Erreur inconnue'}</div>`;
}

BoutiqueApp.applySavedTheme();
BoutiqueApp.initThemeToggle();
BoutiqueApp.updateCartCount();
fetchVehicle();
