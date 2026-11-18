# Le Chat Perché — correctif visuel

Cette version corrige uniquement l'affichage de la porte, des personnages et des consommations. Les structures `ETAT`, réservations, commandes, paiement, grille A*, déplacements et clics conservent leur logique.

## Démarrage

Ouvrir `bar-a-chats.html` après avoir extrait **le dossier `assets/` au même niveau que le fichier HTML**. Le site est autonome et fonctionne hors ligne ; les polices distantes disposent de substitutions locales.

## 1 — Porte

- L'arche d'entrée et ses deux demi-battants sont dessinés en SVG dans le HTML : ils restent nets à toute échelle.
- Les dimensions ne sont définies qu'au même endroit dans le CSS : `.porte`, via `--porte-largeur`, `--porte-hauteur`, `--porte-bord`, `--porte-rayon`. Les battants et l'intérieur réutilisent ces variables pour leur découpe.
- L'encadrement n'est plus dessiné par `lierrePorteSVG()` : cette fonction ne contient que les plantes, les feuilles et le paillasson.
- `assets/decor/interieur-porte.png` est une **découpe portrait 7:10** préparée à partir de la photo/illustration d'origine (elle n'ajoute pas de détails inexistants à l'image source).
- La porte du salon « Entrée » et celle « Privé » sont aussi dessinées en SVG net, sans recourir aux petits WebP.
- L'animation à deux battants, l'écriteau OPEN, les plantes et le paillasson sont conservés.

## 2 — Personnages

- Les variantes `*-tq.webp`, `*-tq-assis.webp`, `*-tq-buste.webp`, `*-tq-pas.webp` sont toujours incluses dans `assets/persos/`, mais ne sont plus utilisées pour l'affichage.
- Les vues de face et assises, leur miroir horizontal, ainsi que les vues de dos, sont conservées.
- Les deux poses de marche ont des états d'opacité mutuellement exclusifs, sans fondu.
- Voir `VARIANTES_TQ_A_REGENERER.txt` pour les **36 fichiers** à remplacer ultérieurement si désiré.

## 3 — Consommations

- Table unique de mesures `PLATEAUX_REELS` : source WebP de chaque table, centre et rayons de la surface visible en pixels de l'image.
- Les images sources de menu ont été recadrées sur leur boîte alpha opaque, et les PNG découpés sont dans `assets/menu/*-table-decoupe.png`.
- Les consommations se posent par leur base réelle et possèdent une petite ombre de contact.
- Répartition adaptée aux surfaces elliptiques des six types de tables. En cas d'affluence sur une très petite table, un badge `+N` indique les autres consommations, toujours comptabilisées dans l'addition.
- Le rendu des plats reste entre la table et les personnes assises de premier plan, selon les z-index existants.
- `bar-a-chats.html?debug=1` active **les ellipses roses et points de pose** (inactif par défaut). Utilisable également après ouverture locale du fichier HTML.

## Contrôles réalisés

- Chromium, densité simulée Retina 2× : captures à 320, 768, 1440 et 1920 px ; vérification porte ouverte/fermée.
- Aucune exception JavaScript détectée pendant les scénarios automatisés.
- Parcours : ouverture porte, identification, placement, ajout d'articles, compte à rebours visible, paiement bloqué avant service, paiement autorisé après service, libération de la table.
- Mise en situation de toutes les tables remplies avec plusieurs plats servis : contrôle géométrique des bases sur le plateau, et absence de chevauchement des boîtes d'illustration.
- Un service a été simulé à l'état « servie » dans le test de paiement ; le trajet automatique de livraison n'a pas été réécrit.

**Remarque :** les SVG introduits ici concernent uniquement les portes en tant qu'éléments vectoriels de l'interface, conformément à la correction demandée ; aucun visuel des chats ou de la clientèle n'a été remplacé.
