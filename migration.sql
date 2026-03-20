
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE constructeurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE vehicules (
    id SERIAL PRIMARY KEY,
    nom_modele VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    constructeur_id INTEGER REFERENCES constructeurs(id)
);

