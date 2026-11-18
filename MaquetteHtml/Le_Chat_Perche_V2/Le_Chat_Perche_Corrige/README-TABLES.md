# Le Chat Perché — Correctif d'homogénéité des tables

## Livrable

Ouvrez `bar-a-chats.html` avec le dossier `assets/` à côté (inchangés pour les autres ressources).

## Modifications d'affichage

1. **Grisage en une seule passe :** les composants d'une table (sièges, mobilier, clients assis, commandes servies, minuteur et indicateur `+N`) sont regroupés dans `.groupe-table` et subissent un **seul filtre CSS** en mode placement. Les plaques de capacité restent dans le calque d'interface pour que leur texte reste lisible ; elles prennent une teinte neutre lorsque la table est inéligible. Les deux anciens sélecteurs `.placement .ent.inelig` ont été supprimés.
2. **Table basse réparée :** le fichier `assets/mobilier/table-basse.webp` conserve **146 × 86 px**, les points d'ancrage et l'emprise de la version d'origine. Le rebord frontal est désormais continu et opaque ; les pixels parasites sous les pieds ont été nettoyés. Les quatre autres WebP `table-2.webp`, `table-4.webp`, `table-6.webp` et `table-4-occupee.webp` ont été contrôlés et ne demandaient pas de retouche du tablier.
3. **Zones unifiées :** quatre tapis colorés auparavant codés en dur dans le décor ont été supprimés. Les six tables possèdent chacune une unique ellipse dans leur propre groupe, aux dimensions définies dans `ZONES_TABLE`, sans conflit avec les tables voisines. Couleurs : jaune doux (éligible), rose doux (occupée), gris neutre (inéligible), crème neutre (libre sans placement).
4. **Fond neutre :** un fond elliptique discret se trouve sous les plateaux pour éviter de faire apparaître une autre couleur par transparence.

## Fonctionnement préservé

Aucune modification des objets `ETAT`, des tableaux de commandes/réservations, des calculs A*, des obstacles, des emprises du mobilier, de la géométrie de clic, des minuteurs, du paiement ou des transitions de statut. Le rendu des tables a été réorganisé : `entite` et `calque` acceptent uniquement un **parent de rendu facultatif**, dont la valeur par défaut reste `scene`.

Le mode `?debug=1` et ses six ellipses de plateau sont inchangés ; sans ce paramètre, elles restent invisibles.

## Tests réalisés le 18 novembre 2026

- Chromium, largeur de viewport **1440 px**, densité **2×** : captures en mode placement pour **2**, **4**, **6** personnes, avec T2/T3/T6 occupées et des commandes servies.
- T5 : vues rapprochées en état éligible et inéligible, rebord sans bande colorée.
- Groupe visuel gris : les plats et les clients suivent le grisage du meuble, l'étiquette de capacité reste lisible.
- Parcours par clics réels : porte, client, formulaire (4 personnes), placement T5, commande, paiement interdit tant qu'une commande est en préparation, service simulé par avance du statut, paiement autorisé, table libérée.
- Débogage : 6 ellipses avec `?debug=1`, aucune en mode normal.
- Aucune erreur JavaScript pendant ces vérifications.

> Les captures ont été effectuées dans un navigateur Chromium contrôlé, avec les images intégrées temporairement comme données pour contourner une restriction de navigation du navigateur de test ; **cette transformation n'est pas incluse dans le site livré**.
