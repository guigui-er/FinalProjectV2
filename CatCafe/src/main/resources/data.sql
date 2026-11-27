-- Données initiales du projet CatCafe
-- Ordre : les tables référencées sont remplies avant celles qui les référencent
INSERT IGNORE INTO `compte` (
    `type_compte`,
    `id`,
    `civilite`,
    `login`,
    `nom`,
    `password`,
    `prenom`,
    `salaire`
  )
VALUES (
    'Gerant',
    1,
    'Homme',
    'admin',
    'Garfield',
    '$2a$10$DPEwmwbMAp0c5S2njvbzxelseFzhBkzhcyzsgQ70mUzcZ836rSQIa',
    'Jon',
    2500
  ),
  (
    'Serveur',
    2,
    'Femme',
    NULL,
    'Martin',
    NULL,
    'Lila',
    1750
  ),
  (
    'Serveur',
    3,
    'Homme',
    NULL,
    'Nguyen',
    NULL,
    'Téo',
    1750
  ),
  (
    'Serveur',
    4,
    'Femme',
    NULL,
    'Tanaka',
    NULL,
    'Akiko',
    1750
  ),
  (
    'Client',
    5,
    'NB',
    NULL,
    'Dupont',
    NULL,
    'Famille',
    NULL
  ),
  (
    'Client',
    6,
    'NB',
    NULL,
    'Bernard',
    NULL,
    'Léa et Tom',
    NULL
  ),
  (
    'Client',
    7,
    'NB',
    NULL,
    'Durand',
    NULL,
    'Famille',
    NULL
  ),
  (
    'Client',
    8,
    'NB',
    NULL,
    'Jerry',
    NULL,
    'Famille',
    NULL
  ),
  (
    'Client',
    9,
    'NB',
    NULL,
    'Garcia',
    NULL,
    'Maëva et Camille',
    NULL
  ),
  (
    'Client',
    50,
    'Homme',
    NULL,
    'Abid',
    NULL,
    'Jordan',
    NULL
  ),
  (
    'Client',
    53,
    'Femme',
    NULL,
    'Perrouault',
    NULL,
    'Jeremy',
    NULL
  );
INSERT IGNORE INTO `assise` (`id`, `capacite`, `complet`)
VALUES (1, 2, 0),
  (2, 3, 1),
  (3, 4, 0),
  (4, 6, 1),
  (5, 6, 0),
  (6, 8, 0);
INSERT IGNORE INTO `articles` (
    `type_article`,
    `id`,
    `description`,
    `prix`,
    `type`,
    `chaud`,
    `format`
  )
VALUES ('Boisson', 1, 'Espresso', 2.8, NULL, 1, 'petit'),
  (
    'Boisson',
    2,
    'Cappuccino',
    4.5,
    NULL,
    1,
    'moyen'
  ),
  ('Boisson', 3, 'Matcha', 5.2, NULL, 1, 'grand'),
  ('Boisson', 4, 'Thé glacé', 2.6, NULL, 0, 'petit'),
  (
    'Boisson',
    5,
    'Citronnade ',
    3.2,
    NULL,
    0,
    'moyen'
  ),
  (
    'Boisson',
    6,
    'Iced Latte',
    3.9,
    NULL,
    0,
    'grand'
  ),
  (
    'Alimentaire',
    7,
    'Cookie',
    3,
    'gateau',
    NULL,
    NULL
  ),
  (
    'Alimentaire',
    8,
    'Croque-matou',
    8.5,
    'plat',
    NULL,
    NULL
  ),
  (
    'Alimentaire',
    9,
    'Glace',
    2.8,
    'glace',
    NULL,
    NULL
  ),
  (
    'Alimentaire',
    10,
    'Pancakes',
    5,
    'gateau',
    NULL,
    NULL
  ),
  (
    'Alimentaire',
    11,
    'Brownie',
    4.2,
    'gateau',
    NULL,
    NULL
  );
INSERT IGNORE INTO `chat` (
    `id`,
    `adopté`,
    `age_mois`,
    `caractère`,
    `caresses`,
    `date_veto`,
    `endormi`,
    `nom`,
    `race`,
    `satisfait`,
    `sexe`,
    `proprietaire`
  )
VALUES (
    1,
    0,
    36,
    'Calme et câline',
    NULL,
    '2026-09-12',
    0,
    'Moka',
    'Persan',
    1,
    'femelle',
    NULL
  ),
  (
    2,
    0,
    60,
    'Joueur et gourmand',
    NULL,
    '2026-10-28',
    0,
    'Réglisse',
    'Maine Coon',
    1,
    'mâle',
    NULL
  ),
  (
    3,
    1,
    48,
    'Curieuse',
    NULL,
    '2026-02-15',
    1,
    'Nougat',
    'Siamois',
    1,
    'femelle',
    6
  ),
  (
    4,
    0,
    36,
    'Joueur',
    NULL,
    '2026-11-27',
    0,
    'Pépite',
    'Bengal',
    1,
    'mâle',
    NULL
  ),
  (
    5,
    0,
    24,
    'Joueur',
    NULL,
    '2026-12-01',
    1,
    'Sushi',
    'Scottish Fold',
    1,
    'mâle',
    NULL
  );
INSERT IGNORE INTO `reservation` (
    `id`,
    `date_reservation`,
    `nombre_client`,
    `assise_id`,
    `client_id`
  )
VALUES (1, '2026-11-09 11:00:00.000000', 4, 3, 5),
  (4, '2026-11-24 10:58:11.000000', 5, 5, 7),
  (5, '2026-11-24 14:58:11.295000', 6, 6, 8),
  (12, '2026-11-26 14:21:34.000000', 2, 4, 50),
  (15, '2026-11-26 14:56:36.000000', 2, 2, 53);
INSERT IGNORE INTO `commande` (
    `id`,
    `accepter_paiement`,
    `date`,
    `statut_commande`,
    `reservation_id`,
    `serveur_id`
  )
VALUES (
    1,
    1,
    '2026-11-09 11:00:00.000000',
    'Terminee',
    1,
    2
  ),
  (
    4,
    1,
    '2026-11-24 10:58:56.000000',
    'Terminee',
    4,
    3
  ),
  (
    5,
    0,
    '2026-11-24 14:58:56.904000',
    'Terminee',
    5,
    2
  ),
  (
    16,
    0,
    '2026-11-26 14:21:44.000000',
    'Servie',
    12,
    NULL
  ),
  (
    19,
    0,
    '2026-11-26 14:56:48.000000',
    'Servie',
    15,
    NULL
  );
INSERT IGNORE INTO `detail_commande` (`id`, `prix`, `qte`, `article_id`, `commande_id`)
VALUES (1, 3.20, 4, 5, 1),
  (2, 3.00, 3, 7, 1),
  (4, 3.20, 5, 5, 4),
  (5, 3.00, 4, 7, 4),
  (6, 8.50, 3, 8, 4),
  (7, 3.20, 6, 5, 5),
  (8, 3.00, 4, 7, 5),
  (16, 2.80, 1, 1, 16),
  (17, 2.60, 1, 4, 16),
  (18, 2.80, 1, 9, 16),
  (19, 3.00, 1, 7, 16),
  (26, 4.20, 1, 11, 19),
  (27, 3.20, 1, 5, 19),
  (28, 4.50, 1, 2, 19),
  (29, 5.00, 1, 10, 19);