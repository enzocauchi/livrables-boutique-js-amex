const loginForm = document.querySelector('#login-form');
const dashboard = document.querySelector('#dashboard');
const loginBtn = document.querySelector('#login-btn');
const logoutBtn = document.querySelector('#logout-btn');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const errorMsg = document.querySelector('#msg-error');
const successMsg = document.querySelector('#msg-success');
const avatarEl = document.querySelector('#avatar');
const welcomeNameEl = document.querySelector('#welcome-name');

const DEMO_CREDENTIALS = { username: 'admin', password: '1234' };
const STORAGE_KEY = 'auth_user';

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.add('active');
    successMsg.classList.remove('active');
}

function showSuccess(message) {
    successMsg.textContent = message;
    successMsg.classList.add('active');
    errorMsg.classList.remove('active');
}

function hideMessages() {
    errorMsg.classList.remove('active');
    successMsg.classList.remove('active');
}

function formatUsername(username) {
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
}

function showDashboard(username) {
    loginForm.style.display = 'none';
    dashboard.style.display = 'grid';
    
    const firstLetter = username.charAt(0).toUpperCase();
    avatarEl.textContent = firstLetter;
    welcomeNameEl.textContent = `Bienvenue ${formatUsername(username)}`;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ username, timestamp: Date.now() }));
}

function showLoginForm() {
    dashboard.style.display = 'none';
    loginForm.style.display = 'grid';
    usernameInput.value = '';
    passwordInput.value = '';
    hideMessages();
    usernameInput.focus();
}

function checkAuth() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const user = JSON.parse(stored);
            if (user.username) {
                showDashboard(user.username);
                return;
            }
        } catch (e) {
            localStorage.removeItem(STORAGE_KEY);
        }
    }
    showLoginForm();
}

loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    hideMessages();
    
    if (!username) {
        showError('Entrez votre identifiant');
        return;
    }
    
    if (!password) {
        showError('Entrez votre mot de passe');
        return;
    }
    
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        showSuccess('Connexion réussie !');
        setTimeout(() => {
            showDashboard(username);
        }, 600);
    } else {
        showError('Identifiant ou mot de passe incorrect');
        passwordInput.value = '';
        passwordInput.focus();
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    showLoginForm();
});

passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

BoutiqueApp.applySavedTheme();
BoutiqueApp.initThemeToggle();
BoutiqueApp.updateCartCount();
BoutiqueApp.updateFavoriteCount();
checkAuth();
