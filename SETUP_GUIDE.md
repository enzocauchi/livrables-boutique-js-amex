# 🚀 BOUTIQUE CYBERPUNK 2077 - GUIDE DE CONFIGURATION COMPLET

## ⚠️ IMPORTANT: Configuration Base de Données

### Étape 1: Vérifier MySQL

```bash
# Démarrer MySQL (macOS avec Homebrew)
brew services start mysql

# Ou vérifier si c'est déjà actif
mysql -u root -p
# Password: root
```

### Étape 2: Créer la Base de Données

Si la base n'existe pas, l'exécuter une fois:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS boutique;"
```

---

## 🛠️ SETUP BACKEND

### 1. Installer les Dépendances
```bash
cd backend
npm install
```

### 2. Exécuter la Migration

**Cette étape ajoute automatiquement les colonnes manquantes:**
```bash
node api/database/migrate.js
```

Output attendu:
```
🔧 Starting database migration...
✅ Column stock_quantity added
✅ Column promotion_percent added
✅ Migration completed successfully!
```

### 3. Charger les Données de Test (Optionnel)

Pour avoir des données de test avec stock et promotions:
```bash
node api/database/seed-data.js
```

Output attendu:
```
✅ Vehicle 1: stock=15, promo=10%
✅ Vehicle 2: stock=8, promo=15%
✅ Vehicle 3: stock=0, promo=0%
✅ Vehicle 4: stock=12, promo=20%
✅ Vehicle 5: stock=5, promo=5%
```

### 4. Démarrer le Serveur

```bash
npm start
```

Output attendu:
```
✅ Connecté à MySQL sur la base "boutique"
Serveur lancé sur le port 8080
```

---

## 🌐 ACCÉDER À L'APPLICATION

Une fois le serveur démarré sur http://localhost:8080:

| Page | URL |
|------|-----|
| Home | http://localhost:8080 |
| Catalogue | http://localhost:8080/catalogue.html |
| Panier | http://localhost:8080/cart.html |
| À Propos | http://localhost:8080/about.html |
| Détail Véhicule | http://localhost:8080/vehicle.html?id=1 |

### API Endpoints

```
GET /api/voitures              → Tous les véhicules
GET /api/voiture/:id           → Détails d'un véhicule
POST /api/commandes            → Créer une commande
POST /api/auth/register        → Créer un compte utilisateur
POST /api/auth/login           → Se connecter avec identifiant ou email
```

---

## ✅ TESTER LES FEATURES

### 1. Stock Management

```
✓ Ouvrir http://localhost:8080
✓ Chercher "Emperor" (véhicule #3)
✓ Le bouton doit afficher "Rupture" et être désactivé
✓ Véhicule #1 doit montrer "Stock 15"
```

### 2. Promotions

```
✓ Chercher "Quartz specter" (véhicule #2)
✓ Voir le badge "-15%"
✓ Prix barré + prix final réduit
✓ Ajouter au panier
✓ Vérifier le récapitulatif montre la réduction
```

### 3. Adresses Sauvegardées

```
✓ Aller à http://localhost:8080/cart.html
✓ Remplir le formulaire de livraison
✓ Cocher "Retenir cette adresse"
✓ Recharger la page (F5)
✓ Voir le dropdown "Adresses sauvegardées"
✓ Cliquer "Utiliser" pour charger l'adresse
```

### 4. Checkout Complet

```
✓ Ajouter articles au panier
✓ Remplir adresse complète (tous les champs requis)
✓ Cliquer "Passer la commande"
✓ Voir confirmation: "Commande #[ID] validee"
✓ Panier se vide
✓ Stock décrémenté dans la BD
```

---

## 🔧 TROUBLESHOOTING

### Erreur: "Cannot GET /vehicle.html"
**Solution:** Le serveur n'a pas les fichiers HTML configurés
```bash
# S'assurer que backend/app.js a:
# app.use(express.static(path.join(__dirname, "..")));
# Redémarrer: npm start
```

### Erreur: "Unknown column 'stock_quantity'"
**Solution:** Les colonnes ne sont pas dans la BD
```bash
node api/database/migrate.js
```

### Erreur: "Connection refused"
**Solution:** MySQL n'est pas actif
```bash
# Démarrer MySQL
brew services start mysql

# Vérifier la connexion
mysql -u root -p
```

### Port 8080 déjà utilisé
**Solution:** Tuer le processus existant
```bash
# Trouver le PID
lsof -i :8080

# Tuer le processus (remplacer XXXX par le PID)
kill -9 XXXX
```

### Les données de test ne s'affichent pas
**Solution:** Recharger les données
```bash
node api/database/seed-data.js
```

---

## 📊 STRUCTURE BASE DE DONNÉES

```
vehicules (table principale)
├── id (PK)
├── nom_modele
├── image_url
├── category_id (FK)
├── constructeur_id (FK)
├── prix
├── stock_quantity ⭐ (NOUVEAU)
└── promotion_percent ⭐ (NOUVEAU)

users (authentification)
├── id (PK)
├── username (unique)
├── email (unique)
├── password_hash
├── salt
└── created_at

commandes (orders)
├── id (PK)
├── customer_name
├── address_line1
├── address_line2
├── postal_code
├── city
├── country
├── total_amount
└── timestamps

commande_items (line items)
├── id (PK)
├── commande_id (FK)
├── vehicule_id (FK)
├── variant_name
├── quantity
└── unit_price
```

---

## 🎯 CHECKLIST DÉPLOIEMENT

- [ ] MySQL installé et démarré
- [ ] Base de données "boutique" créée
- [ ] `cd backend && npm install`
- [ ] `node api/database/migrate.js` (colonnes ajoutées)
- [ ] `node api/database/seed-data.js` (optionnel, données de test)
- [ ] `npm start` (serveur lancé sur :8080)
- [ ] Accéder à http://localhost:8080
- [ ] Tester stock management (véhicule #3 = "Rupture")
- [ ] Tester promotions (véhicule #2 = -15%)
- [ ] Tester adresses sauvegardées (localStorage)
- [ ] Tester checkout complet (création commande)
- [ ] Vérifier stock décrémenté en BD après commande

---

## 📝 FICHIERS IMPORTANTS

| Fichier | Purpose |
|---------|---------|
| `backend/app.js` | Configuration Express |
| `backend/api/database/migrate.js` | Migration schema |
| `backend/api/database/seed-data.js` | Données de test |
| `backend/api/model/model.js` | Logique métier |
| `js/cart.js` | Gestion panier + checkout |
| `js/shared.js` | Fonctions utilitaires + adresses |

---

**Status:** ✅ Production Ready  
**Last Updated:** April 10, 2026  
**Environment:** Node.js + Express + MySQL

