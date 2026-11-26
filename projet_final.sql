-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 26 nov. 2026 à 14:58
-- Version du serveur : 8.4.7
-- Version de PHP : 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_final`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `type_article` enum('Alimentaire','Boisson') NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(200) NOT NULL,
  `prix` double NOT NULL,
  `type` enum('gateau','glace','plat','recetteSpeciale') DEFAULT NULL,
  `chaud` bit(1) DEFAULT NULL,
  `format` enum('grand','moyen','petit') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`type_article`, `id`, `description`, `prix`, `type`, `chaud`, `format`) VALUES
('Boisson', 1, 'Espresso', 2.8, NULL, b'1', 'petit'),
('Boisson', 2, 'Cappuccino', 4.5, NULL, b'1', 'moyen'),
('Boisson', 3, 'Matcha', 5.2, NULL, b'1', 'grand'),
('Boisson', 4, 'Thé glacé', 2.6, NULL, b'0', 'petit'),
('Boisson', 5, 'Citronnade ', 3.2, NULL, b'0', 'moyen'),
('Boisson', 6, 'Iced Latte', 3.9, NULL, b'0', 'grand'),
('Alimentaire', 7, 'Cookie', 3, 'gateau', NULL, NULL),
('Alimentaire', 8, 'Croque-matou', 8.5, 'plat', NULL, NULL),
('Alimentaire', 9, 'Glace', 2.8, 'glace', NULL, NULL),
('Alimentaire', 10, 'Pancakes', 5, 'gateau', NULL, NULL),
('Alimentaire', 11, 'Brownie', 4.2, 'gateau', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `assise`
--

DROP TABLE IF EXISTS `assise`;
CREATE TABLE IF NOT EXISTS `assise` (
  `id` int NOT NULL AUTO_INCREMENT,
  `capacite` int NOT NULL,
  `complet` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `assise`
--

INSERT INTO `assise` (`id`, `capacite`, `complet`) VALUES
(1, 2, b'0'),
(2, 3, b'1'),
(3, 4, b'0'),
(4, 6, b'1'),
(5, 6, b'0'),
(6, 8, b'0');

-- --------------------------------------------------------

--
-- Structure de la table `chat`
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adopté` bit(1) NOT NULL,
  `age_mois` int NOT NULL,
  `age_annees` int GENERATED ALWAYS AS ((`age_mois` DIV 12)) STORED NOT NULL,
  `caractère` varchar(255) NOT NULL,
  `caresses` int DEFAULT NULL,
  `date_veto` date NOT NULL,
  `endormi` bit(1) NOT NULL,
  `nom` varchar(35) NOT NULL,
  `race` varchar(35) NOT NULL,
  `satisfait` bit(1) NOT NULL,
  `sexe` enum('femelle','mâle') NOT NULL,
  `proprietaire` int DEFAULT NULL,
  `age (mois)` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKcfi4gocdyhqb5ntwaiwidp2w4` (`proprietaire`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `chat`
--

INSERT INTO `chat` (`id`, `adopté`, `age_mois`, `caractère`, `caresses`, `date_veto`, `endormi`, `nom`, `race`, `satisfait`, `sexe`, `proprietaire`, `age (mois)`) VALUES
(1, b'0', 36, 'Calme et câline', NULL, '2026-09-12', b'0', 'Moka', 'Persan', b'1', 'femelle', NULL, 0),
(2, b'0', 60, 'Joueur et gourmand', NULL, '2026-10-28', b'0', 'Réglisse', 'Maine Coon', b'1', 'mâle', NULL, 0),
(3, b'1', 48, 'Curieuse', NULL, '2026-02-15', b'1', 'Nougat', 'Siamois', b'1', 'femelle', 6, 0),
(4, b'0', 36, 'Joueur', NULL, '2026-11-27', b'0', 'Pépite', 'Bengal', b'1', 'mâle', NULL, 0),
(5, b'0', 24, 'Joueur', NULL, '2026-12-01', b'1', 'Sushi', 'Scottish Fold', b'1', 'mâle', NULL, 0);

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accepter_paiement` bit(1) NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `statut_commande` enum('Annulee','En_cours','Servie','Terminee') DEFAULT NULL,
  `reservation_id` int DEFAULT NULL,
  `serveur_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKhgkylcaasqbqs3yva6nlbnyq6` (`reservation_id`),
  KEY `FKp3vb5seapiicusigspgsqrurc` (`serveur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id`, `accepter_paiement`, `date`, `statut_commande`, `reservation_id`, `serveur_id`) VALUES
(1, b'1', '2026-11-09 11:00:00.000000', 'Terminee', 1, 2),
(4, b'1', '2026-11-24 10:58:56.000000', 'Terminee', 4, 3),
(5, b'0', '2026-11-24 14:58:56.904000', 'Terminee', 5, 2),
(16, b'0', '2026-11-26 14:21:44.000000', 'Servie', 12, NULL),
(19, b'0', '2026-11-26 14:56:48.000000', 'Servie', 15, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

DROP TABLE IF EXISTS `compte`;
CREATE TABLE IF NOT EXISTS `compte` (
  `type_compte` enum('Client','Serveur','Gerant') NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `civilite` enum('Femme','Homme','NB') NOT NULL,
  `login` varchar(30) DEFAULT NULL,
  `nom` varchar(25) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `prenom` varchar(25) NOT NULL,
  `salaire` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKa0jr9j935oikjgxinnvwiwirq` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `compte`
--

INSERT INTO `compte` (`type_compte`, `id`, `civilite`, `login`, `nom`, `password`, `prenom`, `salaire`) VALUES
('Gerant', 1, 'Homme', 'admin', 'Garfield', '$2a$10$DPEwmwbMAp0c5S2njvbzxelseFzhBkzhcyzsgQ70mUzcZ836rSQIa', 'Jon', 2500),
('Serveur', 2, 'Femme', NULL, 'Martin', NULL, 'Lila', 1750),
('Serveur', 3, 'Homme', NULL, 'Nguyen', NULL, 'Téo', 1750),
('Serveur', 4, 'Femme', NULL, 'Tanaka', NULL, 'Akiko', 1750),
('Client', 5, 'NB', NULL, 'Dupont', NULL, 'Famille', NULL),
('Client', 6, 'NB', NULL, 'Bernard', NULL, 'Léa et Tom', NULL),
('Client', 7, 'NB', NULL, 'Durand', NULL, 'Famille', NULL),
('Client', 8, 'NB', NULL, 'Jerry', NULL, 'Famille', NULL),
('Client', 9, 'NB', NULL, 'Garcia', NULL, 'Maëva et Camille', NULL),
('Client', 50, 'Homme', NULL, 'Abid', NULL, 'Jordan', NULL),
('Client', 53, 'Femme', NULL, 'Perrouault', NULL, 'Jeremy', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `detail_commande`
--

DROP TABLE IF EXISTS `detail_commande`;
CREATE TABLE IF NOT EXISTS `detail_commande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prix` decimal(4,2) DEFAULT NULL,
  `qte` int NOT NULL,
  `article_id` int NOT NULL,
  `commande_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9at239636dg3fv6whdcu4r5uh` (`article_id`),
  KEY `FKhnnhytux90h0isl1d1960dpd2` (`commande_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `detail_commande`
--

INSERT INTO `detail_commande` (`id`, `prix`, `qte`, `article_id`, `commande_id`) VALUES
(1, 3.20, 4, 5, 1),
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

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_reservation` datetime(6) DEFAULT NULL,
  `nombre_client` int DEFAULT NULL,
  `assise_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKre69o9bqnk879td70f4t1fn53` (`assise_id`),
  KEY `FK6ubjctp8thupfw90ssvcvr5tt` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `date_reservation`, `nombre_client`, `assise_id`, `client_id`) VALUES
(1, '2026-11-09 11:00:00.000000', 4, 3, 5),
(4, '2026-11-24 10:58:11.000000', 5, 5, 7),
(5, '2026-11-24 14:58:11.295000', 6, 6, 8),
(12, '2026-11-26 14:21:34.000000', 2, 4, 50),
(15, '2026-11-26 14:56:36.000000', 2, 2, 53);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `FK79ijolkuyrj5wnsya49lk1le3` FOREIGN KEY (`proprietaire`) REFERENCES `compte` (`id`);

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `FK7nvlvjrgvybs4plhc9cekjobv` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`),
  ADD CONSTRAINT `FKp3vb5seapiicusigspgsqrurc` FOREIGN KEY (`serveur_id`) REFERENCES `compte` (`id`);

--
-- Contraintes pour la table `detail_commande`
--
ALTER TABLE `detail_commande`
  ADD CONSTRAINT `FK9at239636dg3fv6whdcu4r5uh` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  ADD CONSTRAINT `FKhnnhytux90h0isl1d1960dpd2` FOREIGN KEY (`commande_id`) REFERENCES `commande` (`id`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FK6ubjctp8thupfw90ssvcvr5tt` FOREIGN KEY (`client_id`) REFERENCES `compte` (`id`),
  ADD CONSTRAINT `FKre69o9bqnk879td70f4t1fn53` FOREIGN KEY (`assise_id`) REFERENCES `assise` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
