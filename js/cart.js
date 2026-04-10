const itemsContainer = document.querySelector('#cartItems');
const summaryCount = document.querySelector('#summaryCount');
const summaryTotal = document.querySelector('#summaryTotal');

function renderCart() {
    const cart = BoutiqueApp.getCart();
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + Number(item.prix) * item.quantity, 0);

    summaryCount.textContent = totalQuantity;
    summaryTotal.textContent = `¥${BoutiqueApp.formatPrice(totalPrice)}`;

    if (!cart.length) {
        itemsContainer.innerHTML = '<p class="empty-cart">Ton panier est vide. Retourne au catalogue pour ajouter des vehicules.</p>';
        BoutiqueApp.updateCartCount();
        return;
    }

    const list = document.createElement('div');
    list.className = 'cart-list';

    cart.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'cart-item';
        card.innerHTML = `
            <img src="${BoutiqueApp.getAssetUrl(item.image_url)}" alt="${item.nom_modele}">
            <div>
                <h3>${item.nom_modele}</h3>
                <p>${item.constructeur || 'Constructeur inconnu'} • ${item.variantName}</p>
                <p>¥${BoutiqueApp.formatPrice(item.prix)} l'unite</p>
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
            if (action === 'increase') {
                nextCart[index].quantity += 1;
            } else {
                nextCart[index].quantity -= 1;
                if (nextCart[index].quantity <= 0) {
                    nextCart.splice(index, 1);
                }
            }

            BoutiqueApp.saveCart(nextCart);
            renderCart();
        });

        list.appendChild(card);
    });

    itemsContainer.innerHTML = '';
    itemsContainer.appendChild(list);
    BoutiqueApp.updateCartCount();
}

BoutiqueApp.applySavedTheme();
BoutiqueApp.initThemeToggle();
BoutiqueApp.updateFavoriteCount();
renderCart();
