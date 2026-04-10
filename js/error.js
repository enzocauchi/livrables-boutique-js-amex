BoutiqueApp.applySavedTheme();
BoutiqueApp.initThemeToggle();

const params = new URLSearchParams(window.location.search);
const message = params.get('message');

if (message) {
    const errorMessage = document.querySelector('#apiErrorMessage');
    if (errorMessage) {
        errorMessage.textContent = decodeURIComponent(message);
    }
}
