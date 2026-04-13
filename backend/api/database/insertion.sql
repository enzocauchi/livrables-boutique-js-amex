-- ==========================================
-- 1. INSERTION DES CATEGORIES
-- ==========================================
INSERT IGNORE INTO categories (id, nom) VALUES
(1, 'Moto'),
(2, 'Voiture');

-- ==========================================
-- 2. INSERTION DES CONSTRUCTEURS
-- ==========================================
INSERT IGNORE INTO constructeurs (id, nom) VALUES
(1, 'Arch'), (2, 'Brennan'), (3, 'Yaiba'), (4, 'Archer'),
(5, 'Chevillon'), (6, 'Herrera'), (7, 'Mahir'), (8, 'Makigai'),
(9, 'Militech'), (10, 'Mizutani'), (11, 'Porsche'), (12, 'Quadra'),
(13, 'Rayfield'), (14, 'Thorton'), (15, 'Villefort');

-- ==========================================
-- 3. INSERTION DES VEHICULES
-- ==========================================
INSERT INTO vehicules (id, nom_modele, image_url, category_id, constructeur_id, prix, stock_quantity, promotion_percent) VALUES
(1, 'Quartz bandit', 'static/Images/Voiture/Archer/Quartz bandit/De bse/1-photomode_23032026_090217.png', 2, 4, 9800000, 7, 0),
(2, 'Quartz specter', 'static/Images/Voiture/Archer/Quartz specter/De bse/1-photomode_23032026_090411.png', 2, 4, 10800000, 5, 10),
(3, 'Emperor', 'static/Images/Voiture/Chevillon/Emperor/De bse/1-photomode_20032026_121456.png', 2, 5, 9500000, 4, 5),
(4, 'Legatu µ µ', 'static/Images/Voiture/Chevillon/Legatu µ/De bse/1-photomode_20032026_121720.png', 2, 5, 8900000, 6, 0),
(5, 'Outlaw', 'static/Images/Voiture/Herrera/Outlaw/De bse/1-photomode_20032026_122050.png', 2, 6, 7800000, 8, 15),
(6, 'Supron', 'static/Images/Voiture/Mahir/Supron/De bse/1-photomode_23032026_093654.png', 2, 7, 8700000, 9, 0),
(7, 'Supron F 23', 'static/Images/Voiture/Mahir/Supron F 23/De bse/1-Gemini_Generated_Image_hasdhhhasdhhhasd.png', 2, 7, 9000000, 4, 8),
(8, 'Maimai', 'static/Images/Voiture/Makigai/Maimai/De bse/1-photomode_23032026_094210.png', 2, 8, 6500000, 12, 0),
(9, 'Porsche turbo', 'static/Images/Voiture/Porsche/Porsche turbo/De bse/1-photomode_20032026_105105.png', 2, 11, 15000000, 3, 12),
(10, 'Porsche turbo cabriolet', 'static/Images/Voiture/Porsche/Porsche turbo cabriolet/De bse/1-photomode_20032026_105745.png', 2, 11, 15500000, 2, 18),
(11, 'Aerondight', 'static/Images/Voiture/Rayfield/Aerondight/De bse/1-Gemini_Generated_Image_t4ekd7t4ekd7t4ek.png', 2, 13, 14500000, 2, 10),
(12, 'caliburn', 'static/Images/Voiture/Rayfield/caliburn/De bse/1-photomode_23032026_094725.png', 2, 13, 15000000, 1, 20),
(13, 'Colby', 'static/Images/Voiture/Thorton/Colby/De bse/1-photomode_23032026_095019.png', 2, 14, 9300000, 10, 0),
(14, 'Galena', 'static/Images/Voiture/Thorton/Galena/De bse/1-Gemini_Generated_Image_7uhrt77uhrt77uhr.png', 2, 14, 9800000, 6, 6),
(15, 'Columbus', 'static/Images/Voiture/Villefort/Columbus/De bse/1-photomode_23032026_095527.png', 2, 15, 8500000, 7, 0),
(16, 'Cortes', 'static/Images/Voiture/Villefort/Cortes/De bse/1-photomode_23032026_095818.png', 2, 15, 8700000, 5, 9),
(17, 'Riptide', 'static/Images/Voiture/Herrera/Riptide/De bse/Gemini_Generated_Image_7j0h5y7j0h5y7j0h.png', 2, 6, 7200000, 6, 5),
(18, 'Tanishi', 'static/Images/Voiture/Makigai/Tanishi/De bse/photomode_12042026_185330.png', 2, 8, 6200000, 7, 0),
(19, 'Hozuki', 'static/Images/Voiture/Mizutani/Hozuki/De bse/Gemini_Generated_Image_69butx69butx69bu.png', 2, 10, 7600000, 5, 8),
(20, 'Shion', 'static/Images/Voiture/Mizutani/Shion/De bse/photomode_12042026_185018.png', 2, 10, 8300000, 4, 0),
(21, 'Sport', 'static/Images/Voiture/Quadra/Sport/De bse/photomode_12042026_184713.png', 2, 12, 8200000, 6, 10),
(22, 'Turbo', 'static/Images/Voiture/Quadra/Turbo/De bse/Gemini_Generated_Image_n31c12n31c12n31c.png', 2, 12, 12500000, 3, 12);

-- ==========================================
-- 4. INSERTION DES VARIANTES
-- ==========================================
INSERT INTO variantes (vehicule_id, image_url, nom) VALUES
(1, 'static/Images/Voiture/Archer/Quartz bandit/Bleu/1-Gemini_Generated_Image_ug6abvug6abvug6a.png', 'Bleu'),
(1, 'static/Images/Voiture/Archer/Quartz bandit/De bse/1-photomode_23032026_090217.png', 'De bse'),
(1, 'static/Images/Voiture/Archer/Quartz bandit/vert/1-Gemini_Generated_Image_6chqaa6chqaa6chq.png', 'Vert'),
(2, 'static/Images/Voiture/Archer/Quartz specter/Bleu/1-Gemini_Generated_Image_kx7bq9kx7bq9kx7b.png', 'Bleu'),
(2, 'static/Images/Voiture/Archer/Quartz specter/De bse/1-photomode_23032026_090411.png', 'De bse'),
(2, 'static/Images/Voiture/Archer/Quartz specter/Vert/1-Gemini_Generated_Image_mgx192mgx192mgx1.png', 'Vert'),
(3, 'static/Images/Voiture/Chevillon/Emperor/Bleu/1-Gemini_Generated_Image_ohxa2xohxa2xohxa.png', 'Bleu'),
(3, 'static/Images/Voiture/Chevillon/Emperor/De bse/1-photomode_20032026_121456.png', 'De bse'),
(3, 'static/Images/Voiture/Chevillon/Emperor/Vert/1-Gemini_Generated_Image_g20sh4g20sh4g20s.png', 'Vert'),
(4, 'static/Images/Voiture/Chevillon/Legatu µ/Bleu/1-Gemini_Generated_Image_qlk0e2qlk0e2qlk0.png', 'Bleu'),
(4, 'static/Images/Voiture/Chevillon/Legatu µ/De bse/1-photomode_20032026_121720.png', 'De bse'),
(4, 'static/Images/Voiture/Chevillon/Legatu µ/Vert/1-Gemini_Generated_Image_qz57muqz57muqz57.png', 'Vert'),
(5, 'static/Images/Voiture/Herrera/Outlaw/Bleu/1-Gemini_Generated_Image_gtb2gtb2gtb2gtb2.png', 'Bleu'),
(5, 'static/Images/Voiture/Herrera/Outlaw/De bse/1-photomode_20032026_122050.png', 'De bse'),
(5, 'static/Images/Voiture/Herrera/Outlaw/Vert/1-Gemini_Generated_Image_nc15renc15renc15.png', 'Vert'),
(6, 'static/Images/Voiture/Mahir/Supron/Bleu/1-Gemini_Generated_Image_ijmcedijmcedijmc.png', 'Bleu'),
(6, 'static/Images/Voiture/Mahir/Supron/De bse/1-photomode_23032026_093654.png', 'De bse'),
(6, 'static/Images/Voiture/Mahir/Supron/Vert/1-Gemini_Generated_Image_6lsulf6lsulf6lsu.png', 'Vert'),
(7, 'static/Images/Voiture/Mahir/Supron F 23/Bleu/1-Gemini_Generated_Image_9nie6c9nie6c9nie.png', 'Bleu'),
(7, 'static/Images/Voiture/Mahir/Supron F 23/De bse/1-Gemini_Generated_Image_hasdhhhasdhhhasd.png', 'De bse'),
(7, 'static/Images/Voiture/Mahir/Supron F 23/Vert/1-photomode_23032026_093848.png', 'Vert'),
(8, 'static/Images/Voiture/Makigai/Maimai/Bleu/1-Gemini_Generated_Image_51ulsv51ulsv51ul (1).png', 'Bleu'),
(8, 'static/Images/Voiture/Makigai/Maimai/De bse/1-photomode_23032026_094210.png', 'De bse'),
(8, 'static/Images/Voiture/Makigai/Maimai/Vert/1-Gemini_Generated_Image_a98j3ba98j3ba98j.png', 'Vert'),
(9, 'static/Images/Voiture/Porsche/Porsche turbo/Bleu/1-Gemini_Generated_Image_mtgzjqmtgzjqmtgz.png', 'Bleu'),
(9, 'static/Images/Voiture/Porsche/Porsche turbo/De bse/1-photomode_20032026_105105.png', 'De bse'),
(9, 'static/Images/Voiture/Porsche/Porsche turbo/Vert/1-Gemini_Generated_Image_jz88xyjz88xyjz88.png', 'Vert'),
(10, 'static/Images/Voiture/Porsche/Porsche turbo cabriolet/Bleu/1-Gemini_Generated_Image_8gjajd8gjajd8gja.png', 'Bleu'),
(10, 'static/Images/Voiture/Porsche/Porsche turbo cabriolet/De bse/1-photomode_20032026_105745.png', 'De bse'),
(10, 'static/Images/Voiture/Porsche/Porsche turbo cabriolet/Vert/1-Gemini_Generated_Image_gb7bnpgb7bnpgb7b.png', 'Vert'),
(11, 'static/Images/Voiture/Rayfield/Aerondight/Bleu/1-photomode_23032026_094445.png', 'Bleu'),
(11, 'static/Images/Voiture/Rayfield/Aerondight/De bse/1-Gemini_Generated_Image_t4ekd7t4ekd7t4ek.png', 'De bse'),
(11, 'static/Images/Voiture/Rayfield/Aerondight/Vert/1-Gemini_Generated_Image_wu5s6fwu5s6fwu5s.png', 'Vert'),
(12, 'static/Images/Voiture/Rayfield/caliburn/Bleu/1-Gemini_Generated_Image_4jbo2t4jbo2t4jbo.png', 'Bleu'),
(12, 'static/Images/Voiture/Rayfield/caliburn/De bse/1-photomode_23032026_094725.png', 'De bse'),
(12, 'static/Images/Voiture/Rayfield/caliburn/Vert/1-Gemini_Generated_Image_rufyo7rufyo7rufy.png', 'Vert'),
(13, 'static/Images/Voiture/Thorton/Colby/Bleu/1-Gemini_Generated_Image_h84v1kh84v1kh84v.png', 'Bleu'),
(13, 'static/Images/Voiture/Thorton/Colby/De bse/1-photomode_23032026_095019.png', 'De bse'),
(13, 'static/Images/Voiture/Thorton/Colby/Vert/1-Gemini_Generated_Image_ga3sg2ga3sg2ga3s.png', 'Vert'),
(14, 'static/Images/Voiture/Thorton/Galena/Bleu/1-Gemini_Generated_Image_8qtvw88qtvw88qtv.png', 'Bleu'),
(14, 'static/Images/Voiture/Thorton/Galena/De bse/1-Gemini_Generated_Image_7uhrt77uhrt77uhr.png', 'De bse'),
(14, 'static/Images/Voiture/Thorton/Galena/Vert/1-photomode_23032026_095227.png', 'Vert'),
(15, 'static/Images/Voiture/Villefort/Columbus/Bleu/1-Gemini_Generated_Image_gn91pzgn91pzgn91.png', 'Bleu'),
(15, 'static/Images/Voiture/Villefort/Columbus/De bse/1-photomode_23032026_095527.png', 'De bse'),
(15, 'static/Images/Voiture/Villefort/Columbus/Vert/1-Gemini_Generated_Image_wv91l8wv91l8wv91.png', 'Vert'),
(16, 'static/Images/Voiture/Villefort/Cortes/Bleu/1-Gemini_Generated_Image_5y5gjj5y5gjj5y5g.png', 'Bleu'),
(16, 'static/Images/Voiture/Villefort/Cortes/De bse/1-photomode_23032026_095818.png', 'De bse'),
(16, 'static/Images/Voiture/Villefort/Cortes/Vert/1-Gemini_Generated_Image_b09of5b09of5b09o.png', 'Vert'),
(17, 'static/Images/Voiture/Herrera/Riptide/Bleu/photomode_12042026_184210.png', 'Bleu'),
(17, 'static/Images/Voiture/Herrera/Riptide/De bse/Gemini_Generated_Image_7j0h5y7j0h5y7j0h.png', 'De bse'),
(17, 'static/Images/Voiture/Herrera/Riptide/Vert/Gemini_Generated_Image_ie6uo7ie6uo7ie6u.png', 'Vert'),
(18, 'static/Images/Voiture/Makigai/Tanishi/Bleu/Gemini_Generated_Image_7ep5627ep5627ep5.png', 'Bleu'),
(18, 'static/Images/Voiture/Makigai/Tanishi/De bse/photomode_12042026_185330.png', 'De bse'),
(18, 'static/Images/Voiture/Makigai/Tanishi/Vert/Gemini_Generated_Image_5zatqw5zatqw5zat.png', 'Vert'),
(19, 'static/Images/Voiture/Mizutani/Hozuki/Bleu/Gemini_Generated_Image_7d43557d43557d43.png', 'Bleu'),
(19, 'static/Images/Voiture/Mizutani/Hozuki/De bse/Gemini_Generated_Image_69butx69butx69bu.png', 'De bse'),
(19, 'static/Images/Voiture/Mizutani/Hozuki/Vert/photomode_12042026_185152.png', 'Vert'),
(20, 'static/Images/Voiture/Mizutani/Shion/Bleu/Gemini_Generated_Image_22lj6222lj6222lj.png', 'Bleu'),
(20, 'static/Images/Voiture/Mizutani/Shion/De bse/photomode_12042026_185018.png', 'De bse'),
(20, 'static/Images/Voiture/Mizutani/Shion/Vert/Gemini_Generated_Image_51sl6v51sl6v51sl.png', 'Vert'),
(21, 'static/Images/Voiture/Quadra/Sport/Bleu/Gemini_Generated_Image_2apclm2apclm2apc.png', 'Bleu'),
(21, 'static/Images/Voiture/Quadra/Sport/De bse/photomode_12042026_184713.png', 'De bse'),
(21, 'static/Images/Voiture/Quadra/Sport/Vert/Gemini_Generated_Image_k1b3ark1b3ark1b3.png', 'Vert'),
(22, 'static/Images/Voiture/Quadra/Turbo/Bleu/photomode_12042026_184518.png', 'Bleu'),
(22, 'static/Images/Voiture/Quadra/Turbo/De bse/Gemini_Generated_Image_n31c12n31c12n31c.png', 'De bse'),
(22, 'static/Images/Voiture/Quadra/Turbo/Vert/Gemini_Generated_Image_su5en5su5en5su5e.png', 'Vert');
