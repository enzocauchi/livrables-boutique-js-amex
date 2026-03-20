-- ==========================================================
-- SCRIPT D'INTÉGRATION SÉCURISÉ (ÉVITE LES DOUBLONS)
-- ==========================================================

-- 1. Insertion des catégories
INSERT IGNORE INTO categories (nom) VALUES ('Moto'), ('Voiture');

-- 2. Insertion des constructeurs
INSERT IGNORE INTO constructeurs (nom) VALUES
    ('Arch'), ('Brennan'), ('Yaiba'), ('Archer'), ('Chevillon'),
    ('Herrera'), ('Mahir'), ('Makigai'), ('Militech'), ('Mizutani'),
    ('Porsche'), ('Quadra'), ('Rayfield'), ('Thorton'), ('Villefort');

-- ==========================================
-- MOTOS (category_id: 1)
-- ==========================================

-- Arch (constructeur_id: 1)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Jackies Arch', 'static/Images/Vehicules/Moto/Arch/Jackies-Arch-Angle.webp', 1, 1),
    ('Malina Mobile', 'static/Images/Vehicules/Moto/Arch/Malina-Mobile-Angle.webp', 1, 1),
    ('Nazare', 'static/Images/Vehicules/Moto/Arch/Nazare-Angle.webp', 1, 1),
    ('Nazare Itsumade', 'static/Images/Vehicules/Moto/Arch/Nazare-Itsumade-Angle.webp', 1, 1),
    ('Nazare Kobold', 'static/Images/Vehicules/Moto/Arch/Nazare-Kobold-Angle.webp', 1, 1),
    ('Nazare Racer', 'static/Images/Vehicules/Moto/Arch/Nazare-Racer-Angle.webp', 1, 1);

-- Brennan (constructeur_id: 2)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Apollo 650-S', 'static/Images/Vehicules/Moto/Brennan/Apollo-650-S-Angle.webp', 1, 2),
    ('Apollo', 'static/Images/Vehicules/Moto/Brennan/Apollo-Angle.webp', 1, 2),
    ('Scorpions Apollo', 'static/Images/Vehicules/Moto/Brennan/Scorpions-Apollo-Angle.webp', 1, 2);

-- Yaiba (constructeur_id: 3)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Kusanagi Akashita', 'static/Images/Vehicules/Moto/Yaiba/Kusanagi-Akashita-Angle.webp', 1, 3),
    ('Kusanagi CT-3X', 'static/Images/Vehicules/Moto/Yaiba/Kusanagi-CT-3X-Angle.webp', 1, 3),
    ('Kusanagi Peacekeeper', 'static/Images/Vehicules/Moto/Yaiba/Kusanagi-Peacekeeper-Angle.webp', 1, 3),
    ('Yaiba ASM-R250 Muramasa', 'static/Images/Vehicules/Moto/Yaiba/Yaiba-ASM-R250-Muramasa-Angle.webp', 1, 3);


-- ==========================================
-- VOITURES (category_id: 2)
-- ==========================================

-- Archer (4)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Archer Quartz EC-L r275', 'static/Images/Vehicules/Voiture/Archer/Archer-Quartz-EC-L-r275-Angle.webp', 2, 4),
    ('Hella EC-D 1360', 'static/Images/Vehicules/Voiture/Archer/Hella-EC-D-1360-Angle.webp', 2, 4),
    ('Quartz Bandit', 'static/Images/Vehicules/Voiture/Archer/Quartz-Bandit-Angle.webp', 2, 4),
    ('Quartz EC-T2 R660', 'static/Images/Vehicules/Voiture/Archer/Quartz-EC-T2-R660-Angle.webp', 2, 4),
    ('Quartz Sidewinder', 'static/Images/Vehicules/Voiture/Archer/Quartz-Sidewinder-Angle.webp', 2, 4),
    ('Quartz Specter', 'static/Images/Vehicules/Voiture/Archer/Quartz-Specter-Angle.webp', 2, 4);

-- Chevillon (5)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Chevillon Legatus 450 Aquila', 'static/Images/Vehicules/Voiture/Chevillon/Chevillon-Legatus-450-Aquila-Angle.webp', 2, 5),
    ('Emperor 620 Ragar', 'static/Images/Vehicules/Voiture/Chevillon/Emperor-620-Ragar-Angle.webp', 2, 5),
    ('Thrax 388 Jefferson', 'static/Images/Vehicules/Voiture/Chevillon/Thrax-388-Jefferson-Angle.webp', 2, 5);

-- Herrera (6)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Outlaw', 'static/Images/Vehicules/Voiture/Herrera/Outlaw-Angle.webp', 2, 6),
    ('Outlaw Weiler', 'static/Images/Vehicules/Voiture/Herrera/Outlaw-Weiler-Angle.webp', 2, 6),
    ('Riptide Terrier', 'static/Images/Vehicules/Voiture/Herrera/Riptide-Terrier-Angle.webp', 2, 6);

-- Mahir (7)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Mahir Supron FS3-T', 'static/Images/Vehicules/Voiture/Mahir/Mahir-Supron-FS3-T-Angle.webp', 2, 7),
    ('Supron FS3', 'static/Images/Vehicules/Voiture/Mahir/Supron-FS3-Angle.webp', 2, 7),
    ('Supron Trailbruiser', 'static/Images/Vehicules/Voiture/Mahir/Supron-Trailbruiser-Angle.webp', 2, 7);

-- Makigai (8)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Maimai P126', 'static/Images/Vehicules/Voiture/Makigai/Maimai-P126-Angle.webp', 2, 8),
    ('Tanishi Kuma', 'static/Images/Vehicules/Voiture/Makigai/Tanishi-Kuma-Angle.webp', 2, 8),
    ('Tanishi T400', 'static/Images/Vehicules/Voiture/Makigai/Tanishi-T400-Angle.webp', 2, 8);

-- Militech (9)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Hellhound', 'static/Images/Vehicules/Voiture/Militech/Hellhound-Angle.webp', 2, 9);

-- Mizutani (10)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Hozuki Hoseki', 'static/Images/Vehicules/Voiture/Mizutani/Hozuki-Hoseki-Angle.webp', 2, 10),
    ('Mizutani Shion Targa MZT', 'static/Images/Vehicules/Voiture/Mizutani/Mizutani-Shion-Targa-MZT-Angle.webp', 2, 10),
    ('Muzutani Hozuki MH2', 'static/Images/Vehicules/Voiture/Mizutani/Muzutani-Hozuki-MH2-Angle.webp', 2, 10),
    ('Shion Coyote', 'static/Images/Vehicules/Voiture/Mizutani/Shion-Coyote-Angle.webp', 2, 10),
    ('Shion MZ1', 'static/Images/Vehicules/Voiture/Mizutani/Shion-MZ1-Angle.webp', 2, 10),
    ('Shion MZ2', 'static/Images/Vehicules/Voiture/Mizutani/Shion-MZ2-Angle.webp', 2, 10),
    ('Shion Samum', 'static/Images/Vehicules/Voiture/Mizutani/Shion-Samum-Angle.webp', 2, 10);

-- Porsche (11)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('911 Turbo 930', 'static/Images/Vehicules/Voiture/Porsche/911-Turbo-930-Angle.webp', 2, 11),
    ('911 Turbo Cabriolet', 'static/Images/Vehicules/Voiture/Porsche/911-Turbo-Cabriolet-Angle.webp', 2, 11);

-- Quadra (12)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Quadra Type-66 640TS New', 'static/Images/Vehicules/Voiture/Quadra/Quadra-Type-66-640TS-New-Angle.webp', 2, 12),
    ('Quadra Type-66 680TS', 'static/Images/Vehicules/Voiture/Quadra/Quadra-Type-66-680TS-Angle.webp', 2, 12),
    ('Sport R-7 Charon', 'static/Images/Vehicules/Voiture/Quadra/Sport-R-7-Charon-Angle.webp', 2, 12),
    ('Sport R-7 Chiaroscuro', 'static/Images/Vehicules/Voiture/Quadra/Sport-R-7-Chiaroscuro-Angle.webp', 2, 12),
    ('Sport R-7 Sterling', 'static/Images/Vehicules/Voiture/Quadra/Sport-R-7-Sterling-Angle.webp', 2, 12),
    ('Sport R-7 Vigilante', 'static/Images/Vehicules/Voiture/Quadra/Sport-R-7-Vigilante-Angle.webp', 2, 12),
    ('Turbo-R 740', 'static/Images/Vehicules/Voiture/Quadra/Turbo-R-740-Angle.webp', 2, 12),
    ('Turbo-R V-Tech', 'static/Images/Vehicules/Voiture/Quadra/Turbo-R-V-Tech-Angle.webp', 2, 12),
    ('Type-66 640TS', 'static/Images/Vehicules/Voiture/Quadra/Type-66-640TS-Angle.webp', 2, 12),
    ('Type-66 Avenger', 'static/Images/Vehicules/Voiture/Quadra/Type-66-Avenger-Angle.webp', 2, 12),
    ('Type-66 Cthulhu', 'static/Images/Vehicules/Voiture/Quadra/Type-66-Cthulhu-Angle.webp', 2, 12),
    ('Type-66 Hoon', 'static/Images/Vehicules/Voiture/Quadra/Type-66-Hoon-Angle.webp', 2, 12),
    ('Type-66 Javelina', 'static/Images/Vehicules/Voiture/Quadra/Type-66-Javelina-Angle.webp', 2, 12),
    ('Type-66 Jen Rowley', 'static/Images/Vehicules/Voiture/Quadra/Type-66-Jen-Rowley-Angle.webp', 2, 12),
    ('Type-66 Wingate', 'static/Images/Vehicules/Voiture/Quadra/Type-66-Wingate-Angle.webp', 2, 12);

-- Rayfield (13)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Aerondight Guinevere', 'static/Images/Vehicules/Voiture/Rayfield/Aerondight-Guinevere-Angle.webp', 2, 13),
    ('Caliburn', 'static/Images/Vehicules/Voiture/Rayfield/Caliburn-Angle.webp', 2, 13),
    ('Caliburn Mordred', 'static/Images/Vehicules/Voiture/Rayfield/Caliburn-Mordred-Angle.webp', 2, 13),
    ('Caliburn Murkmobile', 'static/Images/Vehicules/Voiture/Rayfield/Caliburn-Murkmobile-Angle.webp', 2, 13);

-- Thorton (14)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Colby Barghest', 'static/Images/Vehicules/Voiture/Thorton/Colby-Barghest-Angle.webp', 2, 14),
    ('Colby C125', 'static/Images/Vehicules/Voiture/Thorton/Colby-C125-Angle.webp', 2, 14),
    ('Colby CX410 Butte', 'static/Images/Vehicules/Voiture/Thorton/Colby-CX410-Butte-Angle.webp', 2, 14),
    ('Colby CX410 Gran Butte', 'static/Images/Vehicules/Voiture/Thorton/Colby-CX410-Gran-Butte-Angle.webp', 2, 14),
    ('Colby Little Mule', 'static/Images/Vehicules/Voiture/Thorton/Colby-Little-Mule-Angle.webp', 2, 14),
    ('Colby Vulture', 'static/Images/Vehicules/Voiture/Thorton/Colby-Vulture-Angle.webp', 2, 14),
    ('Galena G240', 'static/Images/Vehicules/Voiture/Thorton/Galena-G240-Angle.webp', 2, 14),
    ('Galena Gecko', 'static/Images/Vehicules/Voiture/Thorton/Galena-Gecko-Angle.webp', 2, 14),
    ('Galena Locust', 'static/Images/Vehicules/Voiture/Thorton/Galena-Locust-Angle.webp', 2, 14),
    ('Mackinaw Beast', 'static/Images/Vehicules/Voiture/Thorton/Mackinaw-Beast-Angle.webp', 2, 14),
    ('Mackinaw Demiurge', 'static/Images/Vehicules/Voiture/Thorton/Mackinaw-Demiurge-Angle.webp', 2, 14),
    ('Mackinaw MTL1', 'static/Images/Vehicules/Voiture/Thorton/Mackinaw-MTL1-Angle.webp', 2, 14),
    ('Mackinaw Saguaro', 'static/Images/Vehicules/Voiture/Thorton/Mackinaw-Saguaro-Angle.webp', 2, 14),
    ('Merrimac Warlock', 'static/Images/Vehicules/Voiture/Thorton/Merrimac-Warlock-Angle.webp', 2, 14),
    ('Thorton Colby CST40', 'static/Images/Vehicules/Voiture/Thorton/Thorton-Colby-CST40-Angle.webp', 2, 14),
    ('Thorton Galena GA32t', 'static/Images/Voiture/Thorton/Thorton-Galena-GA32t-Angle.webp', 2, 14),
    ('Thorton Galena Rattler', 'static/Images/Vehicules/Voiture/Thorton/Thorton-Galena-Rattler-Angle.webp', 2, 14);

-- Villefort (15)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Alvarado V4F 570 Delegate', 'static/Images/Vehicules/Voiture/Villefort/Alvarado-V4F-570-Delegate-Angle.webp', 2, 15),
    ('Alvarado V4FC 580 Vato', 'static/Images/Vehicules/Voiture/Villefort/Alvarado-V4FC-580-Vato-Angle.webp', 2, 15),
    ('Alvarado V4FH 570 Herman', 'static/Images/Vehicules/Voiture/Villefort/Alvarado-V4FH-570-Herman-Angle.webp', 2, 15),
    ('Columbus V340-F Freight', 'static/Images/Vehicules/Voiture/Villefort/Columbus-V340-F-Freight-Angle.webp', 2, 15),
    ('Cortes V5000 Valor', 'static/Images/Vehicules/Voiture/Villefort/Cortes-V5000-Valor-Angle.webp', 2, 15),
    ('Delamain No', 'static/Images/Vehicules/Voiture/Villefort/Delamain-No.webp', 2, 15),
    ('Deleon Vindicator', 'static/Images/Vehicules/Voiture/Villefort/Deleon-Vindicator-Angle.webp', 2, 15),
    ('Villefort Deleon V410-S Coupe', 'static/Images/Vehicules/Voiture/Villefort/Villefort-Deleon-V410-S-Coupe-Angle.webp', 2, 15);

-- Yaiba ARV (Yaiba est déjà id: 3)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id) VALUES
    ('Yaiba ARV Q340 Semimaru', 'static/Images/Vehicules/Voiture/Yaiba/Yaiba-ARV-Q340-Semimaru-Angle-scaled.webp', 2, 3);