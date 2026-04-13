-- Fix common path typos and safely add missing variant rows for new cars
-- Run this in phpMyAdmin (SQL tab) while using database `boutique` (or prepend 'USE boutique;')

-- 1) Fix typos in stored paths
UPDATE variantes SET image_url = REPLACE(image_url, 'De bse', 'De bse') WHERE image_url LIKE '%De bse%';
UPDATE vehicules SET image_url = REPLACE(image_url, 'De bse', 'De bse') WHERE image_url LIKE '%De bse%';

UPDATE variantes SET image_url = REPLACE(image_url, 'Legatu µ µ', 'Legatu µ') WHERE image_url LIKE '%Legatu µ µ%';
UPDATE vehicules SET image_url = REPLACE(image_url, 'Legatu µ µ', 'Legatu µ') WHERE image_url LIKE '%Legatu µ µ%';

-- 2) Ensure variants exist for Rayfield Aerondight (vehicule_id = 11) and Rayfield caliburn (vehicule_id = 12)
-- Add each image only if an identical record does not already exist for that vehicule_id/image_url.

-- Aerondight (vehicule_id = 11)
INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 11, 'static/Images/Voiture/Rayfield/Aerondight/De bse/1-Gemini_Generated_Image_t4ekd7t4ekd7t4ek.png', 'De bse'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 11 AND image_url = 'static/Images/Voiture/Rayfield/Aerondight/De bse/1-Gemini_Generated_Image_t4ekd7t4ekd7t4ek.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 11, 'static/Images/Voiture/Rayfield/Aerondight/De bse/2-Gemini_Generated_Image_ohapl9ohapl9ohap.png', 'De bse'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 11 AND image_url = 'static/Images/Voiture/Rayfield/Aerondight/De bse/2-Gemini_Generated_Image_ohapl9ohapl9ohap.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 11, 'static/Images/Voiture/Rayfield/Aerondight/De bse/3-Gemini_Generated_Image_frmfkvfrmfkvfrmf.png', 'De bse'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 11 AND image_url = 'static/Images/Voiture/Rayfield/Aerondight/De bse/3-Gemini_Generated_Image_frmfkvfrmfkvfrmf.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 11, 'static/Images/Voiture/Rayfield/Aerondight/Bleu/1-photomode_23032026_094445.png', 'Bleu'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 11 AND image_url = 'static/Images/Voiture/Rayfield/Aerondight/Bleu/1-photomode_23032026_094445.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 11, 'static/Images/Voiture/Rayfield/Aerondight/Bleu/2-photomode_23032026_094501.png', 'Bleu'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 11 AND image_url = 'static/Images/Voiture/Rayfield/Aerondight/Bleu/2-photomode_23032026_094501.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 11, 'static/Images/Voiture/Rayfield/Aerondight/Bleu/3-photomode_23032026_094529.png', 'Bleu'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 11 AND image_url = 'static/Images/Voiture/Rayfield/Aerondight/Bleu/3-photomode_23032026_094529.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 11, 'static/Images/Voiture/Rayfield/Aerondight/Vert/1-Gemini_Generated_Image_wu5s6fwu5s6fwu5s.png', 'Vert'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 11 AND image_url = 'static/Images/Voiture/Rayfield/Aerondight/Vert/1-Gemini_Generated_Image_wu5s6fwu5s6fwu5s.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 11, 'static/Images/Voiture/Rayfield/Aerondight/Vert/2-Gemini_Generated_Image_u7brjxu7brjxu7br.png', 'Vert'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 11 AND image_url = 'static/Images/Voiture/Rayfield/Aerondight/Vert/2-Gemini_Generated_Image_u7brjxu7brjxu7br.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 11, 'static/Images/Voiture/Rayfield/Aerondight/Vert/3-Gemini_Generated_Image_esmk0oesmk0oesmk.png', 'Vert'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 11 AND image_url = 'static/Images/Voiture/Rayfield/Aerondight/Vert/3-Gemini_Generated_Image_esmk0oesmk0oesmk.png');

-- caliburn (vehicule_id = 12)
INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 12, 'static/Images/Voiture/Rayfield/caliburn/De bse/1-photomode_23032026_094725.png', 'De bse'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 12 AND image_url = 'static/Images/Voiture/Rayfield/caliburn/De bse/1-photomode_23032026_094725.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 12, 'static/Images/Voiture/Rayfield/caliburn/De bse/2-photomode_23032026_094740.png', 'De bse'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 12 AND image_url = 'static/Images/Voiture/Rayfield/caliburn/De bse/2-photomode_23032026_094740.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 12, 'static/Images/Voiture/Rayfield/caliburn/De bse/3-photomode_23032026_094756.png', 'De bse'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 12 AND image_url = 'static/Images/Voiture/Rayfield/caliburn/De bse/3-photomode_23032026_094756.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 12, 'static/Images/Voiture/Rayfield/caliburn/Bleu/1-Gemini_Generated_Image_4jbo2t4jbo2t4jbo.png', 'Bleu'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 12 AND image_url = 'static/Images/Voiture/Rayfield/caliburn/Bleu/1-Gemini_Generated_Image_4jbo2t4jbo2t4jbo.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 12, 'static/Images/Voiture/Rayfield/caliburn/Bleu/2-Gemini_Generated_Image_y88g3ny88g3ny88g.png', 'Bleu'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 12 AND image_url = 'static/Images/Voiture/Rayfield/caliburn/Bleu/2-Gemini_Generated_Image_y88g3ny88g3ny88g.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 12, 'static/Images/Voiture/Rayfield/caliburn/Bleu/3-Gemini_Generated_Image_hpofrqhpofrqhpof.png', 'Bleu'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 12 AND image_url = 'static/Images/Voiture/Rayfield/caliburn/Bleu/3-Gemini_Generated_Image_hpofrqhpofrqhpof.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 12, 'static/Images/Voiture/Rayfield/caliburn/Vert/1-Gemini_Generated_Image_rufyo7rufyo7rufy.png', 'Vert'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 12 AND image_url = 'static/Images/Voiture/Rayfield/caliburn/Vert/1-Gemini_Generated_Image_rufyo7rufyo7rufy.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 12, 'static/Images/Voiture/Rayfield/caliburn/Vert/2-Gemini_Generated_Image_wkx5y5wkx5y5wkx5 - Copie.png', 'Vert'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 12 AND image_url = 'static/Images/Voiture/Rayfield/caliburn/Vert/2-Gemini_Generated_Image_wkx5y5wkx5y5wkx5 - Copie.png');

INSERT INTO variantes (vehicule_id, image_url, nom)
SELECT 12, 'static/Images/Voiture/Rayfield/caliburn/Vert/3-Gemini_Generated_Image_j9b8rtj9b8rtj9b8.png', 'Vert'
WHERE NOT EXISTS (SELECT 1 FROM variantes WHERE vehicule_id = 12 AND image_url = 'static/Images/Voiture/Rayfield/caliburn/Vert/3-Gemini_Generated_Image_j9b8rtj9b8rtj9b8.png');

-- 3) Quick checks
SELECT COUNT(*) AS rayfield_aerondight_variants FROM variantes WHERE image_url LIKE '%Rayfield/Aerondight%';
SELECT COUNT(*) AS rayfield_caliburn_variants FROM variantes WHERE image_url LIKE '%Rayfield/caliburn%';

-- End of script
