const API_CANDIDATES = BoutiqueApp.API_ROOTS.map((root) => `${root}/api`);

const page = document.querySelector('#vehiclePage');
const params = new URLSearchParams(window.location.search);
const vehicleId = params.get('id');

let activeApiBase = 'http://localhost:8080';
let currentCar = null;
let activeVariantName = 'De base';
let activeSpriteIndex = 0;

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
    const heroCounter = page.querySelector('.hero-counter');
    const spriteCount = page.querySelector('.sprite-count');
    const sprites = variant?.sprites?.length ? variant.sprites : [variant?.image_url || currentCar.image_url];

    activeSpriteIndex = Math.min(activeSpriteIndex, sprites.length - 1);
    heroImage.src = getAssetUrl(sprites[activeSpriteIndex]);
    heroImage.alt = `${currentCar.nom_modele} ${variant.nom}`;
    if (spriteCount) {
        spriteCount.textContent = sprites.length;
    }
    if (heroCounter) {
        heroCounter.textContent = `${activeSpriteIndex + 1}/${sprites.length}`;
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
            activeSpriteIndex = index;
            heroImage.src = getAssetUrl(sprite);
            if (heroCounter) {
                heroCounter.textContent = `${activeSpriteIndex + 1}/${sprites.length}`;
            }
            page.querySelectorAll('.sprite-card').forEach((node) => node.classList.remove('active'));
            button.classList.add('active');
        });

        strip.appendChild(button);
    });
}

function updateHeroImage(direction) {
    const variant = getActiveVariant();
    const sprites = variant?.sprites?.length ? variant.sprites : [variant?.image_url || currentCar.image_url];
    activeSpriteIndex = (activeSpriteIndex + direction + sprites.length) % sprites.length;
    renderSpriteStrip(variant);
}

function renderColorButtons() {
    const container = page.querySelector('.color-buttons');
    const priceNode = page.querySelector('.price-value');
    container.innerHTML = '';

    (currentCar.variantes || []).forEach((variant) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `color-button${variant.nom === activeVariantName ? ' active' : ''}`;
        button.textContent = variant.nom;
        button.addEventListener('click', () => {
            activeVariantName = variant.nom;
            activeSpriteIndex = 0;
            renderColorButtons();
            renderSpriteStrip(variant);
            if (priceNode) {
                priceNode.textContent = `¥${BoutiqueApp.formatPrice(BoutiqueApp.getFinalPrice(currentCar.prix, variant.nom, currentCar.promotion_percent))}`;
            }
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
                <button class="carousel-arrow prev-arrow" type="button" aria-label="Image precedente">
                    <span>‹</span>
                </button>
                <img class="hero-image" src="" alt="${car.nom_modele}">
                <button class="carousel-arrow next-arrow" type="button" aria-label="Image suivante">
                    <span>›</span>
                </button>
                <span class="hero-counter">1/3</span>
            </div>
            <div class="sprite-strip"></div>
        </div>
        <div class="info-panel">
            <p class="collection-tag">${car.constructeur || 'Constructeur inconnu'}</p>
            <h1>${car.nom_modele}</h1>
            <p class="vehicle-id">ID vehicule #${car.id}</p>
            <p class="lead">${getVehicleLore(car)}</p>
            <div class="price-line">
                <span class="price price-value">¥${BoutiqueApp.formatPrice(BoutiqueApp.getFinalPrice(car.prix, activeVariantName, car.promotion_percent))}</span>
                <span class="availability">Stock ${car.stock_quantity} • ${Number(car.promotion_percent || 0) > 0 ? `Promotion -${car.promotion_percent}%` : 'Sans promotion'}</span>
            </div>
            <div class="color-picker">
                <p>Choisir une couleur</p>
                <div class="color-buttons"></div>
            </div>
            <div class="actions-row">
                <button class="favorite-button detail-favorite${BoutiqueApp.isFavorite(car.id) ? ' is-active' : ''}" type="button" aria-label="Ajouter aux favoris">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 20.5l-7.2-7.1a4.6 4.6 0 0 1 6.5-6.5L12 7.6l0.7-0.7a4.6 4.6 0 1 1 6.5 6.5z"></path>
                    </svg>
                </button>
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
                <article>
                    <span>Stock</span>
                    <strong>${car.stock_quantity}</strong>
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

    page.querySelector('.prev-arrow').addEventListener('click', () => updateHeroImage(-1));
    page.querySelector('.next-arrow').addEventListener('click', () => updateHeroImage(1));
    page.querySelector('.detail-favorite').addEventListener('click', (event) => {
        const nextState = BoutiqueApp.toggleFavorite(car.id);
        event.currentTarget.classList.toggle('is-active', nextState);
    });

    page.querySelector('.primary-action').addEventListener('click', (event) => {
        const variant = getActiveVariant();
        BoutiqueApp.addToCart(
            {
                ...car,
                base_price: Number(car.prix),
                promotion_percent: Number(car.promotion_percent || 0),
                prix: BoutiqueApp.getFinalPrice(car.prix, variant?.nom || 'De base', car.promotion_percent),
                image_url: variant?.sprites?.[0] || variant?.image_url || car.image_url
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
            if (response.status === 404) {
                window.location.href = '404.html';
                return;
            }

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

    window.location.href = `api-error.html?message=${encodeURIComponent(lastError?.message || 'Erreur API')}`;
}

BoutiqueApp.applySavedTheme();
BoutiqueApp.initThemeToggle();
BoutiqueApp.updateCartCount();
BoutiqueApp.updateFavoriteCount();
fetchVehicle();
