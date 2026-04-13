const BoutiqueApp = (() => {
    const THEME_KEY = 'garage-theme';
    const CART_KEY = 'garage-cart';
    const FAVORITES_KEY = 'garage-favorites';
    const ADDRESS_KEY = 'garage-address';
    const SAVED_ADDRESSES_KEY = 'garage-saved-addresses';
    const VARIANT_PRICE_OFFSETS = {
        'De base': 0,
        Bleu: 125000,
        Vert: 235000
    };

    const API_ROOTS = [
        window.location.origin,
        'http://localhost:8080',
        'http://127.0.0.1:8080'
    ].filter((value, index, array) => value.startsWith('http') && array.indexOf(value) === index);

    function applySavedTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }

    function initThemeToggle() {
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem(THEME_KEY, theme);
        });
    }

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        } catch (error) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(car, variantName = 'De base') {
        const cart = getCart();
        const existingItem = cart.find((item) => item.id === car.id && item.variantName === variantName);
        const maxStock = car.stock_quantity || 0;

        if (existingItem) {
            if (existingItem.quantity < maxStock) {
                existingItem.quantity += 1;
            }
        } else {
            if (maxStock > 0) {
                cart.push({
                    id: car.id,
                    nom_modele: car.nom_modele,
                    constructeur: car.constructeur,
                    prix: car.prix,
                    image_url: car.image_url,
                    variantName,
                    quantity: 1,
                    stock_quantity: maxStock
                });
            }
        }

        saveCart(cart);
    }

    function updateCartCount() {
        const count = getCart().reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('[data-cart-count]').forEach((node) => {
            node.textContent = count;
        });
    }

    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
        } catch (error) {
            return [];
        }
    }

    function saveFavorites(favorites) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        updateFavoriteCount();
    }

    function isFavorite(carId) {
        return getFavorites().includes(carId);
    }

    function toggleFavorite(carId) {
        const favorites = getFavorites();
        const nextFavorites = favorites.includes(carId)
            ? favorites.filter((id) => id !== carId)
            : [...favorites, carId];

        saveFavorites(nextFavorites);
        return nextFavorites.includes(carId);
    }

    function updateFavoriteCount() {
        const count = getFavorites().length;
        document.querySelectorAll('[data-favorite-count]').forEach((node) => {
            node.textContent = count;
        });
    }

    function formatPrice(value) {
        return new Intl.NumberFormat('fr-FR').format(Number(value) || 0);
    }

    function getDiscountedBasePrice(basePrice, promotionPercent = 0) {
        return Number(basePrice) * (1 - Number(promotionPercent || 0) / 100);
    }

    function getVariantPrice(basePrice, variantName) {
        return Number(basePrice) + (VARIANT_PRICE_OFFSETS[variantName] || 0);
    }

    function getFinalPrice(basePrice, variantName, promotionPercent = 0) {
        return getVariantPrice(getDiscountedBasePrice(basePrice, promotionPercent), variantName);
    }

    function getAssetUrl(path, apiBase = null) {
        if (!path) return '';
        if (path.startsWith('http')) return path;

        // If path already targets the local static folder, return it as a relative URL
        if (path.startsWith('static/')) {
            return encodeURI(path);
        }

        const root = apiBase
            || (window.location.origin.startsWith('http') ? window.location.origin : 'http://localhost:8080');
        const normalizedPath = path.replace(/^\/+/, '');

        return `${root}/static/${encodeURI(normalizedPath)}`;
    }

    function getDefaultVariant(car) {
        const variants = car?.variantes || [];
        return variants.find((variant) => variant.nom === 'De base') || variants[0] || null;
    }

    function getPrimaryImage(car, preferredVariantName = null) {
        const variants = car?.variantes || [];
        const preferredVariant = preferredVariantName
            ? variants.find((variant) => variant.nom === preferredVariantName)
            : null;
        const selectedVariant = preferredVariant || getDefaultVariant(car);

        if (selectedVariant?.sprites?.length) {
            return selectedVariant.sprites[0];
        }

        return selectedVariant?.image_url || car?.image_url || '';
    }

    // Generate candidate asset paths to try when an image 404s. This helps fix
    // common typos (e.g. "De bse" instead of "De bse") or missing leading
    // numbers in filenames (e.g. "photomode_..png" -> "1-photomode_..png").
    function generateAssetCandidates(originalPath) {
        if (!originalPath) return [''];

        const candidates = [];
        // Always try the original first
        candidates.push(originalPath);

        // Fix common typo "De bse" -> "De bse"
        if (originalPath.includes('De bse')) {
            candidates.push(originalPath.replace('De bse', 'De base'));
        }

        // Ensure folder name is exactly "De bse" when case differs
        if (originalPath.includes('De base') === false && /De\s+base/i.test(originalPath)) {
            candidates.push(originalPath.replace(/De\s+base/i, 'De base'));
        }

        // If filename doesn't start with a numeric prefix like "1-", add "1-" before the filename
        const lastSlash = originalPath.lastIndexOf('/');
        if (lastSlash !== -1) {
            const dir = originalPath.slice(0, lastSlash + 1);
            const file = originalPath.slice(lastSlash + 1);
            if (!/^\d+-/.test(file)) {
                candidates.push(`${dir}1-${file}`);
            }
        }

        // Deduplicate while preserving order
        return Array.from(new Set(candidates));
    }

    // Set image src with fallback attempts on error. Uses BoutiqueApp.getAssetUrl for URL building.
    function setImageWithFallback(imgElement, rawPath) {
        if (!imgElement) return;
        const candidates = generateAssetCandidates(rawPath);
        let attemptIndex = 0;

        function tryNext() {
            if (attemptIndex >= candidates.length) return;
            const candidate = candidates[attemptIndex++];
            const url = getAssetUrl(candidate);
            // attach handler to move to next candidate on error
            imgElement.onerror = () => {
                tryNext();
            };
            imgElement.src = url;
        }

        tryNext();
    }

    function getSavedAddress() {
        try {
            return JSON.parse(localStorage.getItem(ADDRESS_KEY) || '{}');
        } catch (error) {
            return {};
        }
    }

    function saveAddress(address) {
        localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));
    }

    function getSavedAddresses() {
        try {
            return JSON.parse(localStorage.getItem(SAVED_ADDRESSES_KEY) || '[]');
        } catch (error) {
            return [];
        }
    }

    function addSavedAddress(address) {
        const addresses = getSavedAddresses();
        const addressStr = JSON.stringify(address);
        const exists = addresses.some((addr) => JSON.stringify(addr) === addressStr);
        if (!exists) {
            addresses.push(address);
            localStorage.setItem(SAVED_ADDRESSES_KEY, JSON.stringify(addresses));
        }
    }

    function deleteSavedAddress(index) {
        const addresses = getSavedAddresses();
        addresses.splice(index, 1);
        localStorage.setItem(SAVED_ADDRESSES_KEY, JSON.stringify(addresses));
    }

    function loadAddressFromHistory(address) {
        saveAddress(address);
    }

    return {
        API_ROOTS,
        addToCart,
        applySavedTheme,
        getDiscountedBasePrice,
        getFinalPrice,
        formatPrice,
        getAssetUrl,
        // new helpers
        generateAssetCandidates,
        setImageWithFallback,
        getSavedAddress,
        getCart,
        getDefaultVariant,
        getFavorites,
        getPrimaryImage,
        getVariantPrice,
        initThemeToggle,
        isFavorite,
        saveAddress,
        saveCart,
        saveFavorites,
        toggleFavorite,
        updateCartCount,
        updateFavoriteCount,
        getSavedAddresses,
        addSavedAddress,
        deleteSavedAddress,
        loadAddressFromHistory
    };
})();
