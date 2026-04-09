-- ==========================================
-- MOTOS (category_id: 1)
-- ==========================================

-- Arch (constructeur_id: 1)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Jackies Arch', 'http://localhost:8080/Users/alexandreklotz/Documents/KLOTZ Alexandre/professionnel/N1/challenge js/boutique/static/Images/vehicules/Moto/Arch/Jackies-Arch-Angle.webp', 1, 1, 1250000),
    ('Malina Mobile', 'static/Images/vehicules/Moto/Arch/Malina-Mobile-Angle.webp', 1, 1, 1150000),
    ('Nazare', 'static/Images/vehicules/Moto/Arch/Nazare-Angle.webp', 1, 1, 950000),
    ('Nazare Itsumade', 'static/Images/vehicules/Moto/Arch/Nazare-Itsumade-Angle.webp', 1, 1, 1050000),
    ('Nazare Kobold', 'static/Images/vehicules/Moto/Arch/Nazare-Kobold-Angle.webp', 1, 1, 980000),
    ('Nazare Racer', 'static/Images/vehicules/Moto/Arch/Nazare-Racer-Angle.webp', 1, 1, 1100000);

-- Brennan (constructeur_id: 2)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Apollo 650-S', 'static/Images/vehicules/Moto/Brennan/Apollo-650-S-Angle.webp', 1, 2, 890000),
    ('Apollo', 'static/Images/vehicules/Moto/Brennan/Apollo-Angle.webp', 1, 2, 870000),
    ('Scorpions Apollo', 'static/Images/vehicules/Moto/Brennan/Scorpions-Apollo-Angle.webp', 1, 2, 930000);

-- Yaiba (constructeur_id: 3)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Kusanagi Akashita', 'static/Images/vehicules/Moto/Yaiba/Kusanagi-Akashita-Angle.webp', 1, 3, 980000),
    ('Kusanagi CT-3X', 'static/Images/vehicules/Moto/Yaiba/Kusanagi-CT-3X-Angle.webp', 1, 3, 1030000),
    ('Kusanagi Peacekeeper', 'static/Images/vehicules/Moto/Yaiba/Kusanagi-Peacekeeper-Angle.webp', 1, 3, 990000),
    ('Yaiba ASM-R250 Muramasa', 'static/Images/vehicules/Moto/Yaiba/Yaiba-ASM-R250-Muramasa-Angle.webp', 1, 3, 920000);

-- ==========================================
-- VOITURES (category_id: 2)
-- ==========================================

-- Archer (4)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Archer Quartz EC-L r275', 'http://localhost:8080/static/Images/vehicules/Voiture/Archer/Archer-Quartz-EC-L-r275-Angle.webp', 2, 4, 12500000),
    ('Hella EC-D 1360', 'static/Images/vehicules/Voiture/Archer/Hella-EC-D-1360-Angle.webp', 2, 4, 11300000),
    ('Quartz Bandit', 'static/Images/vehicules/Voiture/Archer/Quartz-Bandit-Angle.webp', 2, 4, 9800000),
    ('Quartz EC-T2 R660', 'static/Images/vehicules/Voiture/Archer/Quartz-EC-T2-R660-Angle.webp', 2, 4, 11000000),
    ('Quartz Sidewinder', 'static/Images/vehicules/Voiture/Archer/Quartz-Sidewinder-Angle.webp', 2, 4, 10200000),
    ('Quartz Specter', 'static/Images/vehicules/Voiture/Archer/Quartz-Specter-Angle.webp', 2, 4, 10800000);

-- Chevillon (5)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Chevillon Legatus 450 Aquila', 'static/Images/vehicules/Voiture/Chevillon/Chevillon-Legatus-450-Aquila-Angle.webp', 2, 5, 8900000),
    ('Emperor 620 Ragar', 'static/Images/vehicules/Voiture/Chevillon/Emperor-620-Ragar-Angle.webp', 2, 5, 9500000),
    ('Thrax 388 Jefferson', 'static/Images/vehicules/Voiture/Chevillon/Thrax-388-Jefferson-Angle.webp', 2, 5, 9700000);

-- Herrera (6)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Outlaw', 'static/Images/vehicules/Voiture/Herrera/Outlaw-Angle.webp', 2, 6, 7800000),
    ('Outlaw Weiler', 'static/Images/vehicules/Voiture/Herrera/Outlaw-Weiler-Angle.webp', 2, 6, 8300000),
    ('Riptide Terrier', 'static/Images/vehicules/Voiture/Herrera/Riptide-Terrier-Angle.webp', 2, 6, 8100000);

-- Mahir (7)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Mahir Supron FS3-T', 'static/Images/vehicules/Voiture/Mahir/Mahir-Supron-FS3-T-Angle.webp', 2, 7, 9000000),
    ('Supron FS3', 'static/Images/vehicules/Voiture/Mahir/Supron-FS3-Angle.webp', 2, 7, 8700000),
    ('Supron Trailbruiser', 'static/Images/vehicules/Voiture/Mahir/Supron-Trailbruiser-Angle.webp', 2, 7, 9100000);

-- Makigai (8)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Maimai P126', 'static/Images/vehicules/Voiture/Makigai/Maimai-P126-Angle.webp', 2, 8, 6500000),
    ('Tanishi Kuma', 'static/Images/vehicules/Voiture/Makigai/Tanishi-Kuma-Angle.webp', 2, 8, 6200000),
    ('Tanishi T400', 'static/Images/vehicules/Voiture/Makigai/Tanishi-T400-Angle.webp', 2, 8, 6400000);

-- Militech (9)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Hellhound', 'static/Images/vehicules/Voiture/Militech/Hellhound-Angle.webp', 2, 9, 12000000);

-- Mizutani (10)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Hozuki Hoseki', 'static/Images/vehicules/Voiture/Mizutani/Hozuki-Hoseki-Angle.webp', 2, 10, 6700000),
    ('Mizutani Shion Targa MZT', 'static/Images/vehicules/Voiture/Mizutani/Mizutani-Shion-Targa-MZT-Angle.webp', 2, 10, 7200000),
    ('Muzutani Hozuki MH2', 'static/Images/vehicules/Voiture/Mizutani/Muzutani-Hozuki-MH2-Angle.webp', 2, 10, 7100000),
    ('Shion Coyote', 'static/Images/vehicules/Voiture/Mizutani/Shion-Coyote-Angle.webp', 2, 10, 6900000),
    ('Shion MZ1', 'static/Images/vehicules/Voiture/Mizutani/Shion-MZ1-Angle.webp', 2, 10, 7300000),
    ('Shion MZ2', 'static/Images/vehicules/Voiture/Mizutani/Shion-MZ2-Angle.webp', 2, 10, 7400000),
    ('Shion Samum', 'static/Images/vehicules/Voiture/Mizutani/Shion-Samum-Angle.webp', 2, 10, 7500000);

-- Porsche (11)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('911 Turbo 930', 'static/Images/vehicules/Voiture/Porsche/911-Turbo-930-Angle.webp', 2, 11, 15000000),
    ('911 Turbo Cabriolet', 'static/Images/vehicules/Voiture/Porsche/911-Turbo-Cabriolet-Angle.webp', 2, 11, 15500000);

-- Quadra (12)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Quadra Type-66 640TS New', 'static/Images/vehicules/Voiture/Quadra/Quadra-Type-66-640TS-New-Angle.webp', 2, 12, 9700000),
    ('Quadra Type-66 680TS', 'static/Images/vehicules/Voiture/Quadra/Quadra-Type-66-680TS-Angle.webp', 2, 12, 9800000),
    ('Sport R-7 Charon', 'static/Images/vehicules/Voiture/Quadra/Sport-R-7-Charon-Angle.webp', 2, 12, 9900000),
    ('Sport R-7 Chiaroscuro', 'static/Images/vehicules/Voiture/Quadra/Sport-R-7-Chiaroscuro-Angle.webp', 2, 12, 9950000),
    ('Sport R-7 Sterling', 'static/Images/vehicules/Voiture/Quadra/Sport-R-7-Sterling-Angle.webp', 2, 12, 10000000),
    ('Sport R-7 Vigilante', 'static/Images/vehicules/Voiture/Quadra/Sport-R-7-Vigilante-Angle.webp', 2, 12, 10100000),
    ('Turbo-R 740', 'static/Images/vehicules/Voiture/Quadra/Turbo-R-740-Angle.webp', 2, 12, 10200000),
    ('Turbo-R V-Tech', 'static/Images/vehicules/Voiture/Quadra/Turbo-R-V-Tech-Angle.webp', 2, 12, 10300000),
    ('Type-66 640TS', 'static/Images/vehicules/Voiture/Quadra/Type-66-640TS-Angle.webp', 2, 12, 9700000),
    ('Type-66 Avenger', 'static/Images/vehicules/Voiture/Quadra/Type-66-Avenger-Angle.webp', 2, 12, 9800000),
    ('Type-66 Cthulhu', 'static/Images/vehicules/Voiture/Quadra/Type-66-Cthulhu-Angle.webp', 2, 12, 9900000),
    ('Type-66 Hoon', 'static/Images/vehicules/Voiture/Quadra/Type-66-Hoon-Angle.webp', 2, 12, 9950000),
    ('Type-66 Javelina', 'static/Images/vehicules/Voiture/Quadra/Type-66-Javelina-Angle.webp', 2, 12, 10000000),
    ('Type-66 Jen Rowley', 'static/Images/vehicules/Voiture/Quadra/Type-66-Jen-Rowley-Angle.webp', 2, 12, 10100000),
    ('Type-66 Wingate', 'static/Images/vehicules/Voiture/Quadra/Type-66-Wingate-Angle.webp', 2, 12, 10200000);

-- Rayfield (13)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Aerondight Guinevere', 'static/Images/vehicules/Voiture/Rayfield/Aerondight-Guinevere-Angle.webp', 2, 13, 14500000),
    ('Caliburn', 'static/Images/vehicules/Voiture/Rayfield/Caliburn-Angle.webp', 2, 13, 15000000),
    ('Caliburn Mordred', 'static/Images/vehicules/Voiture/Rayfield/Caliburn-Mordred-Angle.webp', 2, 13, 15500000),
    ('Caliburn Murkmobile', 'static/Images/vehicules/Voiture/Rayfield/Caliburn-Murkmobile-Angle.webp', 2, 13, 16000000);

-- Thorton (14)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Colby Barghest', 'static/Images/vehicules/Voiture/Thorton/Colby-Barghest-Angle.webp', 2, 14, 9200000),
    ('Colby C125', 'static/Images/vehicules/Voiture/Thorton/Colby-C125-Angle.webp', 2, 14, 9300000),
    ('Colby CX410 Butte', 'static/Images/vehicules/Voiture/Thorton/Colby-CX410-Butte-Angle.webp', 2, 14, 9400000),
    ('Colby CX410 Gran Butte', 'static/Images/vehicules/Voiture/Thorton/Colby-CX410-Gran-Butte-Angle.webp', 2, 14, 9500000),
    ('Colby Little Mule', 'static/Images/vehicules/Voiture/Thorton/Colby-Little-Mule-Angle.webp', 2, 14, 9600000),
    ('Colby Vulture', 'static/Images/vehicules/Voiture/Thorton/Colby-Vulture-Angle.webp', 2, 14, 9700000),
    ('Galena G240', 'static/Images/vehicules/Voiture/Thorton/Galena-G240-Angle.webp', 2, 14, 9800000),
    ('Galena Gecko', 'static/Images/vehicules/Voiture/Thorton/Galena-Gecko-Angle.webp', 2, 14, 9900000),
    ('Galena Locust', 'static/Images/vehicules/Voiture/Thorton/Galena-Locust-Angle.webp', 2, 14, 10000000),
    ('Mackinaw Beast', 'static/Images/vehicules/Voiture/Thorton/Mackinaw-Beast-Angle.webp', 2, 14, 10100000),
    ('Mackinaw Demiurge', 'static/Images/vehicules/Voiture/Thorton/Mackinaw-Demiurge-Angle.webp', 2, 14, 10200000),
    ('Mackinaw MTL1', 'static/Images/vehicules/Voiture/Thorton/Mackinaw-MTL1-Angle.webp', 2, 14, 10300000),
    ('Mackinaw Saguaro', 'static/Images/vehicules/Voiture/Thorton/Mackinaw-Saguaro-Angle.webp', 2, 14, 10400000),
    ('Merrimac Warlock', 'static/Images/vehicules/Voiture/Thorton/Merrimac-Warlock-Angle.webp', 2, 14, 10500000),
    ('Thorton Colby CST40', 'static/Images/vehicules/Voiture/Thorton/Thorton-Colby-CST40-Angle.webp', 2, 14, 10600000),
    ('Thorton Galena GA32t', 'static/Images/Voiture/Thorton/Thorton-Galena-GA32t-Angle.webp', 2, 14, 10700000),
    ('Thorton Galena Rattler', 'static/Images/vehicules/Voiture/Thorton/Thorton-Galena-Rattler-Angle.webp', 2, 14, 10800000);

-- Villefort (15)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Alvarado V4F 570 Delegate', 'static/Images/vehicules/Voiture/Villefort/Alvarado-V4F-570-Delegate-Angle.webp', 2, 15, 9600000),
    ('Alvarado V4FC 580 Vato', 'static/Images/vehicules/Voiture/Villefort/Alvarado-V4FC-580-Vato-Angle.webp', 2, 15, 9700000),
    ('Carrington 4x4', 'static/Images/vehicules/Voiture/Villefort/Carrington-4x4-Angle.webp', 2, 15, 8800000),
    ('Carrington 4x4 Classic', 'static/Images/vehicules/Voiture/Villefort/Carrington-4x4-Classic-Angle.webp', 2, 15, 9000000),
    ('Cutter', 'static/Images/vehicules/Voiture/Villefort/Cutter-Angle.webp', 2, 15, 8500000),
    ('Cutter Mamba', 'static/Images/vehicules/Voiture/Villefort/Cutter-Mamba-Angle.webp', 2, 15, 8700000),
    ('Cutter QV', 'static/Images/vehicules/Voiture/Villefort/Cutter-QV-Angle.webp', 2, 15, 8900000),
    ('Cutter Stout', 'static/Images/vehicules/Voiture/Villefort/Cutter-Stout-Angle.webp', 2, 15, 9100000),
    ('V4F 570', 'static/Images/vehicules/Voiture/Villefort/V4F-570-Angle.webp', 2, 15, 9500000),
    ('V4F 570 Patrol', 'static/Images/vehicules/Voiture/Villefort/V4F-570-Patrol-Angle.webp', 2, 15, 9650000),
    ('V4FC 580', 'static/Images/vehicules/Voiture/Villefort/V4FC-580-Angle.webp', 2, 15, 9700000),
    ('V4FC 580 Vato', 'static/Images/vehicules/Voiture/Villefort/V4FC-580-Vato-Angle.webp', 2, 15, 9800000);

-- Yaiba (constructeur_id: 3, voitures)
INSERT IGNORE INTO vehicules (nom_modele, image_url, category_id, constructeur_id, prix) VALUES
    ('Yaiba ARV Q340 Semimaru', 'static/Images/vehicules/Voiture/Yaiba/Yaiba-ARV-Q340-Semimaru-Angle-scaled.webp', 2, 3, 8600000),
    ('Yaiba Kusanagi CT-3X', 'static/Images/vehicules/Voiture/Yaiba/Yaiba-Kusanagi-CT-3X-Angle.webp', 2, 3, 9200000),
    ('Yaiba Kusanagi Peacekeeper', 'static/Images/vehicules/Voiture/Yaiba/Yaiba-Kusanagi-Peacekeeper-Angle.webp', 2, 3, 9500000),
    ('Yaiba ASM-R250 Muramasa', 'static/Images/vehicules/Voiture/Yaiba/Yaiba-ASM-R250-Muramasa-Angle.webp', 2, 3, 8700000);