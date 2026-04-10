const users = [
  { username: 'admin',  password: '1234' },
  { username: 'V_2077', password: 'night_city' },
];

// ── Références DOM ──
const loginForm  = document.getElementById('login-form');
const dashboard  = document.getElementById('dashboard');
const usernameEl = document.getElementById('username');
const passwordEl = document.getElementById('password');
const loginBtn   = document.getElementById('login-btn');
const logoutBtn  = document.getElementById('logout-btn');
const msgError   = document.getElementById('msg-error');
const msgSuccess = document.getElementById('msg-success');
const avatarEl   = document.getElementById('avatar');
const welcomeEl  = document.getElementById('welcome-name');

// ── Fonctions utilitaires ──
function showError(text) {
  msgError.textContent   = '> ERREUR : ' + text;
  msgError.style.display = 'block';
  msgSuccess.style.display = 'none';
}

function showSuccess(text) {
  msgSuccess.textContent   = '> ' + text;
  msgSuccess.style.display = 'block';
  msgError.style.display   = 'none';
}

function clearMessages() {
  msgError.style.display   = 'none';
  msgSuccess.style.display = 'none';
}

// ── Connexion ──
function login() {
  const username = usernameEl.value.trim();
  const password = passwordEl.value;

  if (!username || !password) {
    showError('Champs manquants');
    return;
  }

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    showError('Identifiants incorrects');
    return;
  }

  sessionStorage.setItem('currentUser', username);

  loginForm.style.display  = 'none';
  dashboard.style.display  = 'block';
  avatarEl.textContent     = username.slice(0, 2).toUpperCase();
  welcomeEl.textContent    = username;
  clearMessages();
}

// ── Déconnexion ──
function logout() {
  sessionStorage.removeItem('currentUser');

  dashboard.style.display = 'none';
  loginForm.style.display = 'block';
  usernameEl.value = '';
  passwordEl.value = '';

  showSuccess('Déconnecté. À bientôt, mercenaire.');
}

// ── Vérifier la session au chargement ──
function checkSession() {
  const saved = sessionStorage.getItem('currentUser');
  if (saved) {
    loginForm.style.display = 'none';
    dashboard.style.display = 'block';
    avatarEl.textContent    = saved.slice(0, 2).toUpperCase();
    welcomeEl.textContent   = saved;
  }
}

// ── Événements ──
loginBtn.addEventListener('click', login);
logoutBtn.addEventListener('click', logout);
passwordEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') login();
});

// Lancement
checkSession();
