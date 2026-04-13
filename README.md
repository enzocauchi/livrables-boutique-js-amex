# Boutique (Voitures Cyberpunk)

Résumé
- Application catalogue/vente de véhicules : frontend statique (HTML/JS) + backend Node/Express + MySQL.
- Pages principales : index.html, catalogue.html, vehicle.html.
- Images stockées sous `static/Images/...` et référencées depuis la base de données.

Arborescence importante
- backend/
  - backend/api/database/connection.js — configuration de la base (DB_NAME via env)
  - backend/api/database/migration_boutique_cyberpunk.sql — migration pour créer le schéma
  - backend/api/database/phpmyadmin_import_fixed.sql — import corrigé ("De base")
- js/ — logique frontend
  - js/shared.js — helpers d'assets et fallback d'images
  - js/main.js, js/catalogue.js, js/vehicle.js — utilisation du fallback
- static/Images/Voiture/... — images et sprites (les noms exacts importent)

Prérequis
- Node.js (16+ recommandé)
- MySQL (ou phpMyAdmin)
- Navigateur moderne

Configuration locale
1. Base de données
   - Créer la base et les tables via phpMyAdmin ou mysql CLI.
   - Fichiers utiles : `backend/api/database/migration_boutique_cyberpunk.sql`, `backend/api/database/phpmyadmin_import_fixed.sql`.
   - Si ta base s'appelle `voiture_cyberpunk` ou `vehicule_cyberpunk`, définir DB_NAME avant de lancer le backend.

2. Variables d'environnement (exemple mac/linux)

export DB_HOST=127.0.0.1
export DB_USER=root
export DB_PASSWORD=ton_mdp
export DB_NAME=voiture_cyberpunk
export DB_PORT=3306

3. Installer et démarrer le backend
cd backend
npm install
npm start

Le backend affiche un message de connexion MySQL au démarrage.

4. Servir le frontend
- Ouvrir `index.html` dans le navigateur OU
- Servir le dossier racine : `npx serve .` ou `python -m http.server 8080` puis ouvrir http://localhost:8080

Vérifications utiles
- API véhicules : GET http://localhost:8080/api/voitures
- En base :
  - SELECT COUNT(*) FROM vehicules;
  - SELECT COUNT(*) FROM variantes;

Problèmes connus et corrections
- Chemins d'images mal orthographiés ("De bse") → fichiers SQL corrigés et helpers frontend essayent des variantes de chemins.
- ER_BAD_FIELD_ERROR: Unknown column 'image_url' in 'field list' → ajouter la colonne `image_url` dans `variantes` :
  ALTER TABLE variantes ADD COLUMN image_url VARCHAR(255) NOT NULL AFTER vehicule_id;
  ou exécuter la migration fournie.
- Import SQL → éviter #1062 (duplicate key) : utiliser `INSERT IGNORE` ou `ON DUPLICATE KEY UPDATE`.
- TRUNCATE bloqué par FK → TRUNCATE les tables enfants (variantes) avant les parents, ou `SET FOREIGN_KEY_CHECKS=0;` temporairement.

Notes techniques
- Frontend : `getAssetUrl` retourne chemin relatif si l'URL commence par `static/`; `setImageWithFallback` tente des variantes de chemins (corrige espace/typo et préfixe `1-`).
- Backend model : `getVariantSprites` lit le dossier d'images sur disque pour construire la liste de sprites. Les chemins doivent correspondre exactement aux dossiers/fichiers.

Git & synchronisation
- Pour résoudre divergence sur `git pull` :
  - Démarrer ssh-agent : `eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_ed25519` (entrer la passphrase une fois)
  - Puis : `git fetch origin && git pull --rebase --autostash origin main && git push origin main`

Besoin d'aide
- Je peux :
  - Mettre à jour README.md autrement
  - Générer un script d'initialisation SQL sans commentaires
  - Exécuter des migrations si vous me donnez un accès MySQL

Fichier créé automatiquement par l'outil de maintenance du projet.