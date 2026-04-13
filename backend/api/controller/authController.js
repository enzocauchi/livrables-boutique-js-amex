const AuthModel = require('../model/authModel');

const DEMO_ACCOUNTS = [
    { username: 'admin', password: '1234', email: 'admin@cyberpunk.local' },
    { username: 'V_2077', password: 'night_city', email: 'v2077@cyberpunk.local' }
]
;

function normalizeIdentifier(value) {
    return String(value || '').trim();
}

function normalizeUsername(value) {
    return String(value || '').trim();
}

function buildGeneratedEmail(username) {
    return `${String(username || '').trim().toLowerCase()}@cyberpunk.local`;
}

function sanitizeUser(user) {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at || user.createdAt || null
    };
}

function getDemoAccount(identifier, password) {
    const normalizedIdentifier = normalizeIdentifier(identifier).toLowerCase();

    return DEMO_ACCOUNTS.find((account) => {
        return (
            (account.username.toLowerCase() === normalizedIdentifier || account.email.toLowerCase() === normalizedIdentifier) &&
            account.password === password
        );
    }) || null;
}

exports.register = async (req, res) => {
    const username = normalizeUsername(req.body.username);
    const password = String(req.body.password || '');
    const email = buildGeneratedEmail(username);

    if (!username || username.length < 3) {
        return res.status(400).json({ error: 'L\'identifiant doit contenir au moins 3 caractères.' });
    }

    if (!password || password.length < 4) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 4 caractères.' });
    }

    if (['admin', 'v_2077'].includes(username.toLowerCase())) {
        return res.status(409).json({ error: 'Cet identifiant est réservé.' });
    }

    try {
        const existingUser = await AuthModel.findUserByIdentifier(username);

        if (existingUser) {
            return res.status(409).json({ error: 'Cet identifiant ou cet email existe déjà.' });
        }

        const user = await AuthModel.createUser({ username, email, password });

        return res.status(201).json({
            message: 'Compte créé avec succès.',
            user: sanitizeUser(user)
        });
    } catch (error) {
        console.error(error);

        if (error.message === 'USER_EXISTS') {
            return res.status(409).json({ error: 'Cet identifiant ou cet email existe déjà.' });
        }

        return res.status(500).json({ error: 'Impossible de créer le compte.' });
    }
};

exports.login = async (req, res) => {
    const identifier = normalizeIdentifier(req.body.identifier || req.body.username || req.body.email);
    const password = String(req.body.password || '');

    if (!identifier || !password) {
        return res.status(400).json({ error: 'Identifiant et mot de passe requis.' });
    }

    const demoAccount = getDemoAccount(identifier, password);
    if (demoAccount) {
        return res.json({
            message: 'Connexion réussie.',
            user: sanitizeUser({
                id: 0,
                username: demoAccount.username,
                email: demoAccount.email,
                created_at: null
            })
        });
    }

    try {
        const user = await AuthModel.findUserByIdentifier(identifier);

        if (!user || !AuthModel.verifyPassword(password, user)) {
            return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });
        }

        return res.json({
            message: 'Connexion réussie.',
            user: sanitizeUser(user)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Impossible de vérifier la connexion.' });
    }
};