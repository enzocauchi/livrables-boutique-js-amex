const BoutiqueApp = (() => {
    const THEME_KEY = 'garage-theme';
    const CART_KEY = 'garage-cart';

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

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: car.id,
                nom_modele: car.nom_modele,
                constructeur: car.constructeur,
                prix: car.prix,
                image_url: car.image_url,
                variantName,
                quantity: 1
            });
        }

        saveCart(cart);
    }

    function updateCartCount() {
        const count = getCart().reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('[data-cart-count]').forEach((node) => {
            node.textContent = count;
        });
    }

    function formatPrice(value) {
        return new Intl.NumberFormat('fr-FR').format(Number(value) || 0);
    }

    function getAssetUrl(path, apiBase = null) {
        if (!path) return '';
        if (path.startsWith('http')) return path;

        const root = apiBase
            || (window.location.origin.startsWith('http') ? window.location.origin : 'http://localhost:8080');
        const normalizedPath = path.startsWith('static/')
            ? path.slice('static/'.length)
            : path.replace(/^\/+/, '');

        return `${root}/static/${normalizedPath}`;
    }

    return {
        API_ROOTS,
        addToCart,
        applySavedTheme,
        formatPrice,
        getAssetUrl,
        getCart,
        initThemeToggle,
        saveCart,
        updateCartCount
    };
})();
