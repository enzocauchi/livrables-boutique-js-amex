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
const signupEmailInput = document.querySelector('#signup-email');
const signupPasswordInput = document.querySelector('#signup-password');
const signupPasswordConfirmInput = document.querySelector('#signup-password-confirm');
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
const STORAGE_KEY = 'auth_user';
const ACCOUNTS_KEY = 'user_accounts';

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
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
}

function showDashboard(username) {
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    dashboard.style.display = 'grid';
    
    const firstLetter = username.charAt(0).toUpperCase();
    avatarEl.textContent = firstLetter;
    welcomeNameEl.textContent = `Bienvenue ${formatUsername(username)}`;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ username, timestamp: Date.now() }));
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
    signupEmailInput.value = '';
    signupPasswordInput.value = '';
    signupPasswordConfirmInput.value = '';
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

function accountExists(username) {
    const accounts = getStoredAccounts();
    return username.toLowerCase() in accounts;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Login Handler
loginBtn.addEventListener('click', () => {
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
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        showSuccess('Connexion réussie !', false);
        setTimeout(() => {
            showDashboard(username);
        }, 600);
        return;
    }
    
    // Check user accounts
    const accounts = getStoredAccounts();
    const userKey = username.toLowerCase();
    if (userKey in accounts && accounts[userKey].password === password) {
        showSuccess('Connexion réussie !', false);
        setTimeout(() => {
            showDashboard(username);
        }, 600);
        return;
    }
    
    showError('Identifiant ou mot de passe incorrect', false);
    passwordInput.value = '';
    passwordInput.focus();
});

// Signup Handler
signupBtn.addEventListener('click', () => {
    const username = signupUsernameInput.value.trim();
    const email = signupEmailInput.value.trim();
    const password = signupPasswordInput.value;
    const passwordConfirm = signupPasswordConfirmInput.value;
    
    hideMessages(true);
    
    if (!username) {
        showError('Entrez un identifiant', true);
        return;
    }
    
    if (username.length < 3) {
        showError('L\'identifiant doit contenir au moins 3 caractères', true);
        return;
    }
    
    if (!email) {
        showError('Entrez votre email', true);
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Entrez une adresse email valide', true);
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
    
    if (password !== passwordConfirm) {
        showError('Les mots de passe ne correspondent pas', true);
        return;
    }
    
    if (accountExists(username)) {
        showError('Cet identifiant existe déjà', true);
        return;
    }
    
    // Create account
    const accounts = getStoredAccounts();
    accounts[username.toLowerCase()] = { username, email, password };
    saveAccounts(accounts);
    
    showSuccess('Compte créé avec succès ! Redirection...', true);
    setTimeout(() => {
        showLoginForm();
        usernameInput.value = username;
        usernameInput.focus();
    }, 1200);
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

signupPasswordConfirmInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        signupBtn.click();
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
