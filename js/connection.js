// DOM Elements
const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');
const dashboard = document.querySelector('#dashboard');

// Login Elements
const loginBtn = document.querySelector('#login-btn');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const errorMsg = document.querySelector('#msg-error');
const successMsg = document.querySelector('#msg-success');

// Signup Elements
const signupBtn = document.querySelector('#signup-btn');
const signupUsernameInput = document.querySelector('#signup-username');
const signupPasswordInput = document.querySelector('#signup-password');
const errorMsgSignup = document.querySelector('#msg-error-signup');
const successMsgSignup = document.querySelector('#msg-success-signup');

// Toggle Buttons
const toggleSignupBtn = document.querySelector('#toggle-signup-btn');
const toggleLoginBtn = document.querySelector('#toggle-login-btn');

// Dashboard Elements
const logoutBtn = document.querySelector('#logout-btn');
const avatarEl = document.querySelector('#avatar');
const welcomeNameEl = document.querySelector('#welcome-name');

// Constants
const DEMO_CREDENTIALS = { username: 'admin', password: '1234' };
const DEMO_ACCOUNTS = [
    DEMO_CREDENTIALS,
    { username: 'V_2077', password: 'night_city' }
];
const STORAGE_KEY = 'auth_user';
const ACCOUNTS_KEY = 'user_accounts';
const AUTH_CANDIDATES = BoutiqueApp.API_ROOTS.map((root) => `${root}/api/auth`);

// Utility Functions
function showError(message, isSignup = false) {
    const msgEl = isSignup ? errorMsgSignup : errorMsg;
    const successEl = isSignup ? successMsgSignup : successMsg;
    msgEl.textContent = message;
    msgEl.classList.add('active');
    if (successEl) successEl.classList.remove('active');
}

function showSuccess(message, isSignup = false) {
    const msgEl = isSignup ? successMsgSignup : successMsg;
    const errorEl = isSignup ? errorMsgSignup : errorMsg;
    msgEl.textContent = message;
    msgEl.classList.add('active');
    if (errorEl) errorEl.classList.remove('active');
}

function hideMessages(isSignup = false) {
    if (isSignup) {
        errorMsgSignup.classList.remove('active');
        successMsgSignup.classList.remove('active');
    } else {
        errorMsg.classList.remove('active');
        successMsg.classList.remove('active');
    }
}

function formatUsername(username) {
    if (!username) {
        return '';
    }

    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
}

function showDashboard(user) {
    const account = typeof user === 'string' ? { username: user } : user;
    const username = account.username || '';

    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    dashboard.style.display = 'grid';
    
    const firstLetter = username.charAt(0).toUpperCase();
    avatarEl.textContent = firstLetter;
    welcomeNameEl.textContent = `Bienvenue ${formatUsername(username)}`;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        username,
        email: account.email || '',
        timestamp: Date.now()
    }));
}

function showLoginForm() {
    dashboard.style.display = 'none';
    signupForm.style.display = 'none';
    loginForm.style.display = 'grid';
    usernameInput.value = '';
    passwordInput.value = '';
    hideMessages(false);
    usernameInput.focus();
}

function showSignupForm() {
    dashboard.style.display = 'none';
    loginForm.style.display = 'none';
    signupForm.style.display = 'grid';
    signupUsernameInput.value = '';
    signupPasswordInput.value = '';
    hideMessages(true);
    signupUsernameInput.focus();
}

function getStoredAccounts() {
    const stored = localStorage.getItem(ACCOUNTS_KEY);
    try {
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

function saveAccounts(accounts) {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function normalizeAccountKey(value) {
    return String(value || '').trim().toLowerCase();
}

function accountExists(username) {
    const accounts = getStoredAccounts();
    return normalizeAccountKey(username) in accounts;
}

function findLegacyAccount(identifier, password) {
    const accounts = getStoredAccounts();
    const normalizedIdentifier = normalizeAccountKey(identifier);

    return Object.values(accounts).find((account) => {
        return (
            (normalizeAccountKey(account.username) === normalizedIdentifier || normalizeAccountKey(account.email) === normalizedIdentifier) &&
            account.password === password
        );
    }) || null;
}

function saveLegacyAccount(username, email, password) {
    const accounts = getStoredAccounts();
    accounts[normalizeAccountKey(username)] = { username, email, password };
    saveAccounts(accounts);
}

function buildGeneratedEmail(username) {
    return `${normalizeAccountKey(username) || 'user'}@cyberpunk.local`;
}

function isDemoCredential(username, password) {
    return DEMO_ACCOUNTS.some((account) => {
        return normalizeAccountKey(account.username) === normalizeAccountKey(username) && account.password === password;
    });
}

async function requestAuth(endpoint, payload) {
    let lastError = null;

    for (const baseUrl of AUTH_CANDIDATES) {
        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                return data;
            }

            const error = new Error(data.error || data.message || 'Une erreur est survenue');
            error.status = response.status;
            error.payload = data;
            throw error;
        } catch (error) {
            lastError = error;

            if (error.status) {
                throw error;
            }
        }
    }

    throw lastError || new Error('Impossible de contacter le serveur');
}

// Login Handler
loginBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    hideMessages(false);
    
    if (!username) {
        showError('Entrez votre identifiant', false);
        return;
    }
    
    if (!password) {
        showError('Entrez votre mot de passe', false);
        return;
    }
    
    // Check demo account
    if (isDemoCredential(username, password)) {
        showSuccess('Connexion réussie !', false);
        setTimeout(() => {
            showDashboard(username);
        }, 600);
        return;
    }

    try {
        const response = await requestAuth('/login', {
            identifier: username,
            password
        });

        const account = response.user || { username };
        saveLegacyAccount(account.username || username, account.email || '', password);
        showSuccess('Connexion réussie !', false);
        setTimeout(() => {
            showDashboard(account);
        }, 600);
        return;
    } catch (error) {
        const legacyAccount = findLegacyAccount(username, password);

        if (legacyAccount) {
            showSuccess('Connexion réussie !', false);
            setTimeout(() => {
                showDashboard(legacyAccount);
            }, 600);
            return;
        }

        showError(error.status === 401 ? 'Identifiant ou mot de passe incorrect' : 'Connexion impossible pour le moment', false);
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Signup Handler
signupBtn.addEventListener('click', async () => {
    const username = signupUsernameInput.value.trim();
    const password = signupPasswordInput.value;
    
    hideMessages(true);
    
    if (!username) {
        showError('Entrez un identifiant', true);
        return;
    }
    
    if (username.length < 3) {
        showError('L\'identifiant doit contenir au moins 3 caractères', true);
        return;
    }
    
    if (!password) {
        showError('Entrez un mot de passe', true);
        return;
    }
    
    if (password.length < 4) {
        showError('Le mot de passe doit contenir au moins 4 caractères', true);
        return;
    }
    
    if (DEMO_ACCOUNTS.some((account) => normalizeAccountKey(account.username) === normalizeAccountKey(username))) {
        showError('Cet identifiant est réservé', true);
        return;
    }

    if (accountExists(username)) {
        showError('Cet identifiant existe déjà', true);
        return;
    }
    
    try {
        const response = await requestAuth('/register', {
            username,
            password
        });

        const createdUser = response.user || { username, email: buildGeneratedEmail(username) };
        saveLegacyAccount(createdUser.username || username, createdUser.email || buildGeneratedEmail(username), password);

        showSuccess('Compte créé avec succès ! Redirection...', true);
        setTimeout(() => {
            showLoginForm();
            usernameInput.value = createdUser.username || username;
            usernameInput.focus();
        }, 1200);
    } catch (error) {
        if (error.status === 409) {
            showError(error.payload?.error || 'Cet identifiant existe déjà', true);
            return;
        }

        const localAccounts = getStoredAccounts();
        const localKey = normalizeAccountKey(username);

        if (localAccounts[localKey]) {
            showError('Cet identifiant existe déjà', true);
            return;
        }

        localAccounts[localKey] = { username, email: buildGeneratedEmail(username), password };
        saveAccounts(localAccounts);

        showSuccess('Compte créé en local. Redirection...', true);
        setTimeout(() => {
            showLoginForm();
            usernameInput.value = username;
            usernameInput.focus();
        }, 1200);
    }
});

// Toggle Handlers
toggleSignupBtn.addEventListener('click', () => {
    showSignupForm();
});

toggleLoginBtn.addEventListener('click', () => {
    showLoginForm();
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    showLoginForm();
});

// Enter key submission
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

// Check if already logged in
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

// Initialize
BoutiqueApp.applySavedTheme();
BoutiqueApp.initThemeToggle();
BoutiqueApp.updateCartCount();
BoutiqueApp.updateFavoriteCount();
checkAuth();
