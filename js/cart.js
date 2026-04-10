const itemsContainer = document.querySelector('#cartItems');
const summaryCount = document.querySelector('#summaryCount');
const summarySubtotal = document.querySelector('#summarySubtotal');
const summaryDiscount = document.querySelector('#summaryDiscount');
const summaryTotal = document.querySelector('#summaryTotal');
const checkoutButton = document.querySelector('#checkoutButton');
const checkoutStatus = document.querySelector('#checkoutStatus');

const fields = {
    customerName: document.querySelector('#customerName'),
    line1: document.querySelector('#addressLine1'),
    line2: document.querySelector('#addressLine2'),
    postalCode: document.querySelector('#postalCode'),
    city: document.querySelector('#city'),
    country: document.querySelector('#country')
};
const rememberAddress = document.querySelector('#rememberAddress');
const API_CANDIDATES = BoutiqueApp.API_ROOTS.map((root) => `${root}/api/commandes`);

function getAddressPayload() {
    return {
        customerName: fields.customerName.value.trim(),
        line1: fields.line1.value.trim(),
        line2: fields.line2.value.trim(),
        postalCode: fields.postalCode.value.trim(),
        city: fields.city.value.trim(),
        country: fields.country.value.trim()
    };
}

function hydrateAddress() {
    const savedAddress = BoutiqueApp.getSavedAddress();
    fields.customerName.value = savedAddress.customerName || '';
    fields.line1.value = savedAddress.line1 || '';
    fields.line2.value = savedAddress.line2 || '';
    fields.postalCode.value = savedAddress.postalCode || '';
    fields.city.value = savedAddress.city || '';
    fields.country.value = savedAddress.country || '';
}

function persistAddressIfNeeded() {
    if (rememberAddress.checked) {
        BoutiqueApp.saveAddress(getAddressPayload());
    } else {
        BoutiqueApp.saveAddress({});
    }
}

function computeSummary(cart) {
    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + Number(item.base_price || item.prix) * item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + Number(item.prix) * item.quantity, 0);
    const discount = subtotal - total;

    return { quantity, subtotal, total, discount };
}

function renderCart() {
    const cart = BoutiqueApp.getCart();
    const { quantity, subtotal, total, discount } = computeSummary(cart);

    summaryCount.textContent = quantity;
    summarySubtotal.textContent = `¥${BoutiqueApp.formatPrice(subtotal)}`;
    summaryDiscount.textContent = `-¥${BoutiqueApp.formatPrice(discount)}`;
    summaryTotal.textContent = `¥${BoutiqueApp.formatPrice(total)}`;

    if (!cart.length) {
        itemsContainer.innerHTML = '<p class="empty-cart">Ton panier est vide. Retourne au catalogue pour ajouter des vehicules.</p>';
        BoutiqueApp.updateCartCount();
        return;
    }

    const list = document.createElement('div');
    list.className = 'cart-list';

    cart.forEach((item, index) => {
        const basePrice = Number(item.base_price || item.prix);
        const promoPercent = Number(item.promotion_percent || 0);
        const card = document.createElement('article');
        card.className = 'cart-item';
        card.innerHTML = `
            <img src="${BoutiqueApp.getAssetUrl(item.image_url)}" alt="${item.nom_modele}">
            <div>
                <h3>${item.nom_modele}</h3>
                <p>${item.constructeur || 'Constructeur inconnu'} • ${item.variantName}</p>
                <p>Stock reserve : ${item.stock_quantity ?? 'n/a'}</p>
                <div class="line-prices">
                    ${promoPercent > 0 ? `<span class="old-price">¥${BoutiqueApp.formatPrice(basePrice)}</span>` : ''}
                    <strong>¥${BoutiqueApp.formatPrice(item.prix)} l'unite</strong>
                    ${promoPercent > 0 ? `<span class="promo-tag">-${promoPercent}%</span>` : ''}
                </div>
            </div>
            <div class="item-actions">
                <button type="button" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button type="button" data-action="increase">+</button>
            </div>
        `;

        card.addEventListener('click', (event) => {
            const action = event.target.dataset.action;
            if (!action) return;

            const nextCart = BoutiqueApp.getCart();
            const currentItem = nextCart[index];

            if (action === 'increase') {
                if (currentItem.quantity >= Number(currentItem.stock_quantity || 99)) {
                    checkoutStatus.textContent = 'Impossible d’ajouter plus que le stock disponible.';
                    return;
                }
                currentItem.quantity += 1;
            } else {
                currentItem.quantity -= 1;
                if (currentItem.quantity <= 0) {
                    nextCart.splice(index, 1);
                }
            }

            BoutiqueApp.saveCart(nextCart);
            checkoutStatus.textContent = '';
            renderCart();
        });

        list.appendChild(card);
    });

    itemsContainer.innerHTML = '';
    itemsContainer.appendChild(list);
    BoutiqueApp.updateCartCount();
}

async function submitOrder() {
    const cart = BoutiqueApp.getCart();
    const address = getAddressPayload();

    if (!cart.length) {
        checkoutStatus.textContent = 'Le panier est vide.';
        return;
    }

    if (!address.customerName || !address.line1 || !address.postalCode || !address.city || !address.country) {
        checkoutStatus.textContent = 'Merci de renseigner une adresse complete.';
        return;
    }

    persistAddressIfNeeded();
    checkoutButton.disabled = true;
    checkoutStatus.textContent = 'Validation de la commande...';

    let lastError = null;

    for (const url of API_CANDIDATES) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customerName: address.customerName,
                    address: {
                        line1: address.line1,
                        line2: address.line2,
                        postalCode: address.postalCode,
                        city: address.city,
                        country: address.country
                    },
                    items: cart.map((item) => ({
                        id: item.id,
                        quantity: item.quantity,
                        variantName: item.variantName
                    }))
                })
            });

            if (response.status === 409) {
                const payload = await response.json();
                checkoutStatus.textContent = payload.error;
                checkoutButton.disabled = false;
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const result = await response.json();
            BoutiqueApp.saveCart([]);
            checkoutStatus.textContent = `Commande #${result.orderId} validee.`;
            renderCart();
            checkoutButton.disabled = false;
            return;
        } catch (error) {
            lastError = error;
        }
    }

    window.location.href = `api-error.html?message=${encodeURIComponent(lastError?.message || 'Erreur API')}`;
}

BoutiqueApp.applySavedTheme();
BoutiqueApp.initThemeToggle();
BoutiqueApp.updateFavoriteCount();
hydrateAddress();
Object.values(fields).forEach((field) => field.addEventListener('input', persistAddressIfNeeded));
rememberAddress.addEventListener('change', persistAddressIfNeeded);
checkoutButton.addEventListener('click', submitOrder);
renderCart();
