CREATE DATABASE IF NOT EXISTS boutique CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE boutique;

CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL UNIQUE
    );

CREATE TABLE IF NOT EXISTS constructeurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL UNIQUE
    );

CREATE TABLE IF NOT EXISTS vehicules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom_modele VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    category_id INT,
    constructeur_id INT,
    prix DECIMAL(12) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    promotion_percent INT NOT NULL DEFAULT 0,
    FOREIGN KEY(category_id) REFERENCES categories(id),
    FOREIGN KEY(constructeur_id) REFERENCES constructeurs(id)
    );

CREATE TABLE IF NOT EXISTS variantes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vehicule_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    FOREIGN KEY (vehicule_id) REFERENCES vehicules(id) ON DELETE CASCADE
    );

ALTER TABLE variantes
    ADD COLUMN IF NOT EXISTS image_url VARCHAR(255) NOT NULL AFTER vehicule_id;

ALTER TABLE vehicules
    ADD COLUMN IF NOT EXISTS stock_quantity INT NOT NULL DEFAULT 0 AFTER prix;

ALTER TABLE vehicules
    ADD COLUMN IF NOT EXISTS promotion_percent INT NOT NULL DEFAULT 0 AFTER stock_quantity;

CREATE TABLE IF NOT EXISTS commandes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255) NULL,
    postal_code VARCHAR(20) NOT NULL,
    city VARCHAR(120) NOT NULL,
    country VARCHAR(120) NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS commande_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    commande_id INT NOT NULL,
    vehicule_id INT NOT NULL,
    variant_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicule_id) REFERENCES vehicules(id)
);
