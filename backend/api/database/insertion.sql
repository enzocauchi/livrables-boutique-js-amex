
-- ==========================================
-- 1. INSERTION DES CATÉGORIES
-- ==========================================
INSERT IGNORE INTO categories (id, nom) VALUES
(1, 'Moto'),
(2, 'Voiture');

-- ==========================================
-- 2. INSERTION DES CONSTRUCTEURS (Basé sur tes anciens ID)
-- ==========================================
INSERT IGNORE INTO constructeurs (id, nom) VALUES
(1, 'Arch'), (2, 'Brennan'), (3, 'Yaiba'), (4, 'Archer'),
(5, 'Chevillon'), (6, 'Herrera'), (7, 'Mahir'), (8, 'Makigai'),
(9, 'Militech'), (10, 'Mizutani'), (11, 'Porsche'), (12, 'Quadra'),
(13, 'Rayfield'), (14, 'Thorton'), (15, 'Villefort');

-- ==========================================
-- 3. INSERTION DES VÉHICULES (Issus de tes dossiers)
-- ==========================================
INSERT INTO vehicules (id, nom_modele, image_url, category_id, constructeur_id, prix) VALUES
-- Archer (4)
(1, 'Quartz bandit', 'static/Images/vehicules/Voiture/Archer/Quartz-bandit.webp', 2, 4, 9800000),
(2, 'Quartz specter', 'static/Images/vehicules/Voiture/Archer/Quartz-specter.webp', 2, 4, 10800000),

-- Chevillon (5)
(3, 'Emperor', 'static/Images/vehicules/Voiture/Chevillon/Emperor.webp', 2, 5, 9500000),
(4, 'Legatu µ', 'static/Images/vehicules/Voiture/Chevillon/Legatu.webp', 2, 5, 8900000),

-- Herrera (6)
(5, 'Outlaw', 'static/Images/vehicules/Voiture/Herrera/Outlaw.webp', 2, 6, 7800000),

-- Mahir (7)
(6, 'Supron', 'static/Images/vehicules/Voiture/Mahir/Supron.webp', 2, 7, 8700000),
(7, 'Supron F 23', 'static/Images/vehicules/Voiture/Mahir/Supron-F-23.webp', 2, 7, 9000000),

-- Makigai (8)
(8, 'Maimai', 'static/Images/vehicules/Voiture/Makigai/Maimai.webp', 2, 8, 6500000),

-- Porsche (11)
(9, 'Porsche turbo', 'static/Images/vehicules/Voiture/Porsche/Porsche-turbo.webp', 2, 11, 15000000),
(10, 'Porsche turbo cabriolet', 'static/Images/vehicules/Voiture/Porsche/Porsche-turbo-cabriolet.webp', 2, 11, 15500000),

-- Rayfield (13)
(11, 'Aerondight', 'static/Images/vehicules/Voiture/Rayfield/Aerondight.webp', 2, 13, 14500000),
(12, 'caliburn', 'static/Images/vehicules/Voiture/Rayfield/caliburn.webp', 2, 13, 15000000),

-- Thorton (14)
(13, 'Colby', 'static/Images/vehicules/Voiture/Thorton/Colby.webp', 2, 14, 9300000),
(14, 'Galena', 'static/Images/vehicules/Voiture/Thorton/Galena.webp', 2, 14, 9800000),

-- Villefort (15)
(15, 'Columbus', 'static/Images/vehicules/Voiture/Villefort/Columbus.webp', 2, 15, 8500000),
(16, 'Cortes', 'static/Images/vehicules/Voiture/Villefort/Cortes.webp', 2, 15, 8700000);

-- ==========================================
-- 4. INSERTION DES VARIANTES (Dossiers Bleu, De base, Vert)
-- ==========================================
INSERT INTO variantes (vehicule_id, nom) VALUES
-- Archer
(1, 'Bleu'), (1, 'De base'), (1, 'Vert'),
(2, 'Bleu'), (2, 'De base'), (2, 'Vert'),
-- Chevillon
(3, 'Bleu'), (3, 'De base'), (3, 'Vert'),
(4, 'Bleu'), (4, 'De base'), (4, 'Vert'),
-- Herrera
(5, 'Bleu'), (5, 'De base'), (5, 'Vert'),
-- Mahir
(6, 'Bleu'), (6, 'De base'), (6, 'Vert'),
(7, 'Bleu'), (7, 'De base'), (7, 'Vert'),
-- Makigai
(8, 'Bleu'), (8, 'De base'), (8, 'Vert'),
-- Porsche
(9, 'Bleu'), (9, 'De base'), (9, 'Vert'),
(10, 'Bleu'), (10, 'De base'), (10, 'Vert'),
-- Rayfield
(11, 'Bleu'), (11, 'De base'), (11, 'Vert'),
(12, 'Bleu'), (12, 'De base'), (12, 'Vert'),
-- Thorton
(13, 'Bleu'), (13, 'De base'), (13, 'Vert'),
(14, 'Bleu'), (14, 'De base'), (14, 'Vert'),
-- Villefort
(15, 'Bleu'), (15, 'De base'), (15, 'Vert'),
(16, 'Bleu'), (16, 'De base'), (16, 'Vert');