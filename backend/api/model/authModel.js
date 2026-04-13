const crypto = require('crypto');
const db = require('../database/connection');

const PASSWORD_ITERATIONS = 120000;
const PASSWORD_KEY_LENGTH = 64;
const PASSWORD_DIGEST = 'sha512';

let usersTableReady = null;

function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(results);
        });
    });
}

function ensureUsersTable() {
    if (!usersTableReady) {
        usersTableReady = query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(80) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                salt VARCHAR(64) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    return usersTableReady;
}

function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, PASSWORD_ITERATIONS, PASSWORD_KEY_LENGTH, PASSWORD_DIGEST).toString('hex');
}

function safePasswordCompare(left, right) {
    try {
        const leftBuffer = Buffer.from(left, 'hex');
        const rightBuffer = Buffer.from(right, 'hex');

        if (leftBuffer.length !== rightBuffer.length) {
            return false;
        }

        return crypto.timingSafeEqual(leftBuffer, rightBuffer);
    } catch {
        return false;
    }
}

async function findUserByIdentifier(identifier) {
    await ensureUsersTable();

    const [user] = await query(
        `
            SELECT id, username, email, password_hash, salt, created_at
            FROM users
            WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?)
            LIMIT 1
        `,
        [identifier, identifier]
    );

    return user || null;
}

async function createUser({ username, email, password }) {
    await ensureUsersTable();

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(password, salt);

    try {
        const result = await query(
            'INSERT INTO users (username, email, password_hash, salt) VALUES (?, ?, ?, ?)',
            [username, email, passwordHash, salt]
        );

        return {
            id: result.insertId,
            username,
            email,
            created_at: new Date()
        };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('USER_EXISTS');
        }

        throw error;
    }
}

function verifyPassword(password, user) {
    if (!user) {
        return false;
    }

    const candidateHash = hashPassword(password, user.salt);
    return safePasswordCompare(candidateHash, user.password_hash);
}

module.exports = {
    createUser,
    ensureUsersTable,
    findUserByIdentifier,
    verifyPassword
};