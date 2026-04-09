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
INSERT INTO vehicules (id, nom_modele, image_url, category_id, constructeur_id, prix) VALUES
(1, 'Quartz bandit', 'static/Images/Voiture/Archer/Quartz bandit/De bse/photomode_23032026_090217.png', 2, 4, 9800000),
(2, 'Quartz specter', 'static/Images/Voiture/Archer/Quartz specter/De base/photomode_23032026_090411.png', 2, 4, 10800000),
(3, 'Emperor', 'static/Images/Voiture/Chevillon/Emperor/De base/photomode_20032026_121456.png', 2, 5, 9500000),
(4, 'Legatu µ', 'static/Images/Voiture/Chevillon/Legatu µ/De base/photomode_20032026_121720.png', 2, 5, 8900000),
(5, 'Outlaw', 'static/Images/Voiture/Herrera/Outlaw/De base/photomode_20032026_122136.png', 2, 6, 7800000),
(6, 'Supron', 'static/Images/Voiture/Mahir/Supron/De base/photomode_23032026_093654.png', 2, 7, 8700000),
(7, 'Supron F 23', 'static/Images/Voiture/Mahir/Supron F 23/De base/Gemini_Generated_Image_jxvs5njxvs5njxvs.png', 2, 7, 9000000),
(8, 'Maimai', 'static/Images/Voiture/Makigai/Maimai/De base/photomode_23032026_094239.png', 2, 8, 6500000),
(9, 'Porsche turbo', 'static/Images/Voiture/Porsche/Porsche turbo/De base/photomode_20032026_105105.png', 2, 11, 15000000),
(10, 'Porsche turbo cabriolet', 'static/Images/Voiture/Porsche/Porsche turbo cabriolet/De base/photomode_20032026_105859.png', 2, 11, 15500000),
(11, 'Aerondight', 'static/Images/Voiture/Rayfield/Aerondight/De base/Gemini_Generated_Image_ohapl9ohapl9ohap.png', 2, 13, 14500000),
(12, 'caliburn', 'static/Images/Voiture/Rayfield/caliburn/De base/photomode_23032026_094756.png', 2, 13, 15000000),
(13, 'Colby', 'static/Images/Voiture/Thorton/Colby/De base/photomode_23032026_095019.png', 2, 14, 9300000),
(14, 'Galena', 'static/Images/Voiture/Thorton/Galena/De base/Gemini_Generated_Image_7uhrt77uhrt77uhr.png', 2, 14, 9800000),
(15, 'Columbus', 'static/Images/Voiture/Villefort/Columbus/De base/photomode_23032026_095546.png', 2, 15, 8500000),
(16, 'Cortes', 'static/Images/Voiture/Villefort/Cortes/De base/photomode_23032026_095838.png', 2, 15, 8700000);

-- ==========================================
-- 4. INSERTION DES VARIANTES
-- ==========================================
INSERT INTO variantes (vehicule_id, image_url, nom) VALUES
(1, 'static/Images/Voiture/Archer/Quartz bandit/Bleu/Gemini_Generated_Image_6f6arv6f6arv6f6a.png', 'Bleu'),
(1, 'static/Images/Voiture/Archer/Quartz bandit/De bse/photomode_23032026_090217.png', 'De base'),
(1, 'static/Images/Voiture/Archer/Quartz bandit/vert/Gemini_Generated_Image_ia2xygia2xygia2x.png', 'Vert'),
(2, 'static/Images/Voiture/Archer/Quartz specter/Bleu/Gemini_Generated_Image_sz7ed8sz7ed8sz7e.png', 'Bleu'),
(2, 'static/Images/Voiture/Archer/Quartz specter/De base/photomode_23032026_090411.png', 'De base'),
(2, 'static/Images/Voiture/Archer/Quartz specter/Vert/Gemini_Generated_Image_nwdg5knwdg5knwdg.png', 'Vert'),
(3, 'static/Images/Voiture/Chevillon/Emperor/Bleu/Gemini_Generated_Image_bvtjukbvtjukbvtj.png', 'Bleu'),
(3, 'static/Images/Voiture/Chevillon/Emperor/De base/photomode_20032026_121511.png', 'De base'),
(3, 'static/Images/Voiture/Chevillon/Emperor/Vert/Gemini_Generated_Image_lgzam4lgzam4lgza.png', 'Vert'),
(4, 'static/Images/Voiture/Chevillon/Legatu µ/Bleu/Gemini_Generated_Image_lndi80lndi80lndi.png', 'Bleu'),
(4, 'static/Images/Voiture/Chevillon/Legatu µ/De base/photomode_20032026_121720.png', 'De base'),
(4, 'static/Images/Voiture/Chevillon/Legatu µ/Vert/Gemini_Generated_Image_qz57muqz57muqz57.png', 'Vert'),
(5, 'static/Images/Voiture/Herrera/Outlaw/Bleu/Gemini_Generated_Image_1vvco1vvco1vvco1.png', 'Bleu'),
(5, 'static/Images/Voiture/Herrera/Outlaw/De base/photomode_20032026_122136.png', 'De base'),
(5, 'static/Images/Voiture/Herrera/Outlaw/Vert/Gemini_Generated_Image_4qip7x4qip7x4qip.png', 'Vert'),
(6, 'static/Images/Voiture/Mahir/Supron/Bleu/Gemini_Generated_Image_ijmcedijmcedijmc.png', 'Bleu'),
(6, 'static/Images/Voiture/Mahir/Supron/De base/photomode_23032026_093654.png', 'De base'),
(6, 'static/Images/Voiture/Mahir/Supron/Vert/Gemini_Generated_Image_6lsulf6lsulf6lsu.png', 'Vert'),
(7, 'static/Images/Voiture/Mahir/Supron F 23/Bleu/Gemini_Generated_Image_xwzksnxwzksnxwzk.png', 'Bleu'),
(7, 'static/Images/Voiture/Mahir/Supron F 23/De base/Gemini_Generated_Image_jxvs5njxvs5njxvs.png', 'De base'),
(7, 'static/Images/Voiture/Mahir/Supron F 23/Vert/photomode_23032026_093848.png', 'Vert'),
(8, 'static/Images/Voiture/Makigai/Maimai/Bleu/Gemini_Generated_Image_r1h8jxr1h8jxr1h8.png', 'Bleu'),
(8, 'static/Images/Voiture/Makigai/Maimai/De base/photomode_23032026_094239.png', 'De base'),
(8, 'static/Images/Voiture/Makigai/Maimai/Vert/Gemini_Generated_Image_nj9798nj9798nj97.png', 'Vert'),
(9, 'static/Images/Voiture/Porsche/Porsche turbo/Bleu/Gemini_Generated_Image_pwtejrpwtejrpwte.png', 'Bleu'),
(9, 'static/Images/Voiture/Porsche/Porsche turbo/De base/photomode_20032026_105105.png', 'De base'),
(9, 'static/Images/Voiture/Porsche/Porsche turbo/Vert/Gemini_Generated_Image_ash8ylash8ylash8.png', 'Vert'),
(10, 'static/Images/Voiture/Porsche/Porsche turbo cabriolet/Bleu/Gemini_Generated_Image_8gjajd8gjajd8gja.png', 'Bleu'),
(10, 'static/Images/Voiture/Porsche/Porsche turbo cabriolet/De base/photomode_20032026_105859.png', 'De base'),
(10, 'static/Images/Voiture/Porsche/Porsche turbo cabriolet/Vert/Gemini_Generated_Image_uiv6c3uiv6c3uiv6.png', 'Vert'),
(11, 'static/Images/Voiture/Rayfield/Aerondight/Bleu/photomode_23032026_094501.png', 'Bleu'),
(11, 'static/Images/Voiture/Rayfield/Aerondight/De base/Gemini_Generated_Image_ohapl9ohapl9ohap.png', 'De base'),
(11, 'static/Images/Voiture/Rayfield/Aerondight/Vert/Gemini_Generated_Image_wu5s6fwu5s6fwu5s.png', 'Vert'),
(12, 'static/Images/Voiture/Rayfield/caliburn/Bleu/Gemini_Generated_Image_hpofrqhpofrqhpof.png', 'Bleu'),
(12, 'static/Images/Voiture/Rayfield/caliburn/De base/photomode_23032026_094756.png', 'De base'),
(12, 'static/Images/Voiture/Rayfield/caliburn/Vert/Gemini_Generated_Image_j9b8rtj9b8rtj9b8.png', 'Vert'),
(13, 'static/Images/Voiture/Thorton/Colby/Bleu/Gemini_Generated_Image_5q11jf5q11jf5q11.png', 'Bleu'),
(13, 'static/Images/Voiture/Thorton/Colby/De base/photomode_23032026_095019.png', 'De base'),
(13, 'static/Images/Voiture/Thorton/Colby/Vert/Gemini_Generated_Image_ga3sg2ga3sg2ga3s.png', 'Vert'),
(14, 'static/Images/Voiture/Thorton/Galena/Bleu/Gemini_Generated_Image_mcj30imcj30imcj3.png', 'Bleu'),
(14, 'static/Images/Voiture/Thorton/Galena/De base/Gemini_Generated_Image_7uhrt77uhrt77uhr.png', 'De base'),
(14, 'static/Images/Voiture/Thorton/Galena/Vert/photomode_23032026_095227.png', 'Vert'),
(15, 'static/Images/Voiture/Villefort/Columbus/Bleu/Gemini_Generated_Image_xc9t9jxc9t9jxc9t.png', 'Bleu'),
(15, 'static/Images/Voiture/Villefort/Columbus/De base/photomode_23032026_095546.png', 'De base'),
(15, 'static/Images/Voiture/Villefort/Columbus/Vert/Gemini_Generated_Image_8tlqgd8tlqgd8tlq.png', 'Vert'),
(16, 'static/Images/Voiture/Villefort/Cortes/Bleu/Gemini_Generated_Image_5y5gjj5y5gjj5y5g.png', 'Bleu'),
(16, 'static/Images/Voiture/Villefort/Cortes/De base/photomode_23032026_095838.png', 'De base'),
(16, 'static/Images/Voiture/Villefort/Cortes/Vert/Gemini_Generated_Image_onmr94onmr94onmr.png', 'Vert');
