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
