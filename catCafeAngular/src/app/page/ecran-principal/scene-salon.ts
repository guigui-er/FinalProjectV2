/* =====================================================================
   SCÈNE DU SALON — données générées à partir de la maquette bar-a-chats.html
   Repère : un salon de 880 × 576 px. Toutes les positions sont en pixels de ce repère.
   (x, y) = coin haut-gauche de l'image ; w, h = taille de l'image dans ce repère.
   z = ordre d'affichage (plus grand = devant), identique à la maquette.
   Les images sont dans public/assets/scene/.
   ===================================================================== */

/** une image placée dans le salon */
export interface ObjetScene { nom: string; src: string; x: number; y: number; w: number; h: number; z: number; }

/** une image positionnée, avec son ordre d'affichage */
export interface ImageScene { src: string; x: number; y: number; w: number; h: number; z: number; }

/** une table du salon : ses deux couches d'images (sièges compris), son ellipse, sa plaque et son cadenas */
export interface TableScene {
  id: number;            // id de la table dans la maquette (1 à 6) = id attendu en base
  libelle: string;
  capacite: number;      // capacité de la maquette, utilisée si la table n'existe pas en base
  z: number;
  arriere: ImageScene;   // ce qui est derrière le plateau : chaises du fond, dossiers, fond neutre
  avant: ImageScene;     // la table et ce qui est devant : chaises de côté et de devant, fauteuils
  zone: { x: number; y: number; w: number; h: number };     // ellipse : (x, y) = son centre
  plaque: { x: number; y: number };                         // plaque : (x, y) = milieu de son bord haut
  cadenas: { x: number; y: number; w: number; h: number };
}

/** un emplacement de chat : (x, y) = sous ses pattes ; coussin = posé sur un coussin */
export interface PlaceChat { x: number; y: number; coussin: boolean; }

/** l'image d'un chat : décalage (dx, dy) de son coin haut-gauche par rapport à ses pattes */
export interface ImageChat { src: string; dx: number; dy: number; w: number; h: number; }

export const FOND_SALON: ObjetScene = { nom: "fond", src: "assets/scene/fond-salon.webp", x: 0, y: 0, w: 880, h: 576, z: 0 };

export const PREMIER_PLAN: ObjetScene = { nom: "premier-plan", src: "assets/scene/premier-plan.webp", x: 0, y: 0, w: 880, h: 576, z: 2000 };

/** objets décoratifs, non cliquables : barista, arbre à chat, coussins, plantes, gamelles, bibliothèque */
export const DECOR_SALON: ObjetScene[] = [
  { nom: "barista", src: "assets/scene/barista.webp", x: 486, y: 37, w: 58, h: 100, z: 150 },
  { nom: "arbre-a-chat", src: "assets/scene/arbre-a-chat.webp", x: 165, y: 376, w: 120, h: 191, z: 566 },
  { nom: "coussin-1", src: "assets/scene/coussin-1.webp", x: 70, y: 508, w: 100, h: 44, z: 522 },
  { nom: "coussin-2", src: "assets/scene/coussin-2.webp", x: 540, y: 516, w: 100, h: 44, z: 530 },
  { nom: "coussin-3", src: "assets/scene/coussin-3.webp", x: 670, y: 512, w: 100, h: 44, z: 526 },
  { nom: "vegetal-1", src: "assets/scene/vegetal-1.webp", x: 0, y: 148, w: 61, h: 88, z: 236 },
  { nom: "vegetal-2", src: "assets/scene/vegetal-2.webp", x: 603, y: 126, w: 74, h: 88, z: 214 },
  { nom: "vegetal-3", src: "assets/scene/vegetal-3.webp", x: 825, y: 242, w: 55, h: 88, z: 330 },
  { nom: "vegetal-4", src: "assets/scene/vegetal-4.webp", x: 281, y: 343, w: 48, h: 62, z: 405 },
  { nom: "vegetal-5", src: "assets/scene/vegetal-5.webp", x: 741, y: 320, w: 48, h: 62, z: 382 },
  { nom: "vegetal-6", src: "assets/scene/vegetal-6.webp", x: 689, y: 322, w: 32, h: 30, z: 352 },
  { nom: "vegetal-7", src: "assets/scene/vegetal-7.webp", x: 69, y: 386, w: 102, h: 92, z: 478 },
  { nom: "vegetal-8", src: "assets/scene/vegetal-8.webp", x: 0, y: 490, w: 63, h: 84, z: 574 },
  { nom: "vegetal-9", src: "assets/scene/vegetal-9.webp", x: 643, y: 494, w: 34, h: 30, z: 524 },
  { nom: "vegetal-10", src: "assets/scene/vegetal-10.webp", x: 815, y: 470, w: 65, h: 106, z: 578 }
];

export const PORTE_ENTREE: ObjetScene = { nom: "porte-entree", src: "assets/scene/porte-entree.webp", x: 188, y: 42, w: 84, h: 150, z: 190 };
export const PORTE_PRIVEE: ObjetScene = { nom: "porte-privee", src: "assets/scene/porte-privee.webp", x: 780, y: 42, w: 80, h: 150, z: 190 };
export const COMPTOIR: ObjetScene = { nom: "comptoir", src: "assets/scene/comptoir.webp", x: 320, y: 86, w: 300, h: 132, z: 214 };
export const CAISSE: ObjetScene = { nom: "caisse", src: "assets/scene/caisse.webp", x: 549, y: 94, w: 58, h: 50, z: 215 };

export const CADENAS_SRC = 'assets/scene/cadenas.webp';

/** les six tables de la maquette */
export const TABLES_SALON: TableScene[] = [
  { id: 1, libelle: "Banquette d'angle & table basse", capacite: 6, z: 298,
    arriere: { src: 'assets/scene/table-1-arriere.webp', x: 41, y: 231, w: 236, h: 174, z: 296 },
    avant:   { src: 'assets/scene/table-1-avant.webp', x: 109, y: 241, w: 152, h: 119, z: 298 },
    zone: { x: 185, y: 308, w: 222, h: 118 },
    plaque: { x: 185, y: 381 },
    cadenas: { x: 174, y: 263.44, w: 22, h: 26 } },
  { id: 2, libelle: "Table haute & tabourets", capacite: 2, z: 256,
    arriere: { src: 'assets/scene/table-2-arriere.webp', x: 324, y: 207, w: 52, h: 21, z: 254 },
    avant:   { src: 'assets/scene/table-2-avant.webp', x: 289, y: 177, w: 122, h: 89, z: 256 },
    zone: { x: 350, y: 258, w: 90, h: 50 },
    plaque: { x: 350, y: 278.5 },
    cadenas: { x: 339, y: 196.09, w: 22, h: 26 } },
  { id: 3, libelle: "Table ronde", capacite: 4, z: 300,
    arriere: { src: 'assets/scene/table-3-arriere.webp', x: 501, y: 248, w: 88, h: 70, z: 298 },
    avant:   { src: 'assets/scene/table-3-avant.webp', x: 460, y: 251, w: 170, h: 112, z: 300 },
    zone: { x: 545, y: 308, w: 154, h: 82 },
    plaque: { x: 545, y: 347 },
    cadenas: { x: 534, y: 269.26, w: 22, h: 26 } },
  { id: 4, libelle: "Petite table de bistrot", capacite: 2, z: 272,
    arriere: { src: 'assets/scene/table-4-arriere.webp', x: 708, y: 261, w: 54, h: 22, z: 270 },
    avant:   { src: 'assets/scene/table-4-avant.webp', x: 667, y: 231, w: 136, h: 80, z: 272 },
    zone: { x: 735, y: 280, w: 100, h: 60 },
    plaque: { x: 735, y: 295 },
    cadenas: { x: 724, y: 247.5, w: 22, h: 26 } },
  { id: 5, libelle: "Coin canapé & fauteuils", capacite: 4, z: 452,
    arriere: { src: 'assets/scene/table-5-arriere.webp', x: 671, y: 391, w: 128, h: 72, z: 450 },
    avant:   { src: 'assets/scene/table-5-avant.webp', x: 624, y: 401, w: 222, h: 97, z: 452 },
    zone: { x: 735, y: 460, w: 204, h: 112 },
    plaque: { x: 735, y: 485 },
    cadenas: { x: 724, y: 420.8, w: 22, h: 26 } },
  { id: 6, libelle: "Grande table en bois", capacite: 8, z: 470,
    arriere: { src: 'assets/scene/table-6-arriere.webp', x: 322, y: 412, w: 194, h: 78, z: 468 },
    avant:   { src: 'assets/scene/table-6-avant.webp', x: 310, y: 415, w: 220, h: 131, z: 470 },
    zone: { x: 420, y: 478, w: 250, h: 104 },
    plaque: { x: 420, y: 523 },
    cadenas: { x: 409, y: 438.76, w: 22, h: 26 } }
];

/** emplacements des chats (positions de départ des chats dans la maquette) */
export const PLACES_CHATS: PlaceChat[] = [
  { x: 120, y: 538, coussin: true },
  { x: 590, y: 546, coussin: true },
  { x: 720, y: 542, coussin: true },
  { x: 180, y: 498, coussin: false },
  { x: 650, y: 506, coussin: false }
];

/** pelages, dans l'ordre de la maquette (chat 1 = creme, chat 2 = roux…) */
export const PELAGES_CHATS = ['creme', 'roux', 'gris', 'siamois', 'calico', 'noir-blanc', 'ecaille'];

/** image de chaque chat, nommée chat-<pelage>-<assis|dort>-<coussin|sol> */
export const IMAGES_CHATS: Record<string, ImageChat> = {
  'chat-creme-assis-coussin': { src: 'assets/scene/chat-creme-assis-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-creme-assis-sol': { src: 'assets/scene/chat-creme-assis-sol.webp', dx: -38, dy: -56, w: 76, h: 57 },
  'chat-creme-dort-coussin': { src: 'assets/scene/chat-creme-dort-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-creme-dort-sol': { src: 'assets/scene/chat-creme-dort-sol.webp', dx: -38, dy: -52, w: 76, h: 52 },
  'chat-roux-assis-coussin': { src: 'assets/scene/chat-roux-assis-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-roux-assis-sol': { src: 'assets/scene/chat-roux-assis-sol.webp', dx: -38, dy: -56, w: 76, h: 57 },
  'chat-roux-dort-coussin': { src: 'assets/scene/chat-roux-dort-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-roux-dort-sol': { src: 'assets/scene/chat-roux-dort-sol.webp', dx: -38, dy: -52, w: 76, h: 52 },
  'chat-gris-assis-coussin': { src: 'assets/scene/chat-gris-assis-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-gris-assis-sol': { src: 'assets/scene/chat-gris-assis-sol.webp', dx: -38, dy: -56, w: 76, h: 57 },
  'chat-gris-dort-coussin': { src: 'assets/scene/chat-gris-dort-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-gris-dort-sol': { src: 'assets/scene/chat-gris-dort-sol.webp', dx: -38, dy: -52, w: 76, h: 52 },
  'chat-siamois-assis-coussin': { src: 'assets/scene/chat-siamois-assis-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-siamois-assis-sol': { src: 'assets/scene/chat-siamois-assis-sol.webp', dx: -38, dy: -56, w: 76, h: 57 },
  'chat-siamois-dort-coussin': { src: 'assets/scene/chat-siamois-dort-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-siamois-dort-sol': { src: 'assets/scene/chat-siamois-dort-sol.webp', dx: -38, dy: -52, w: 76, h: 52 },
  'chat-calico-assis-coussin': { src: 'assets/scene/chat-calico-assis-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-calico-assis-sol': { src: 'assets/scene/chat-calico-assis-sol.webp', dx: -38, dy: -56, w: 76, h: 57 },
  'chat-calico-dort-coussin': { src: 'assets/scene/chat-calico-dort-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-calico-dort-sol': { src: 'assets/scene/chat-calico-dort-sol.webp', dx: -38, dy: -52, w: 76, h: 52 },
  'chat-noir-blanc-assis-coussin': { src: 'assets/scene/chat-noir-blanc-assis-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-noir-blanc-assis-sol': { src: 'assets/scene/chat-noir-blanc-assis-sol.webp', dx: -38, dy: -56, w: 76, h: 57 },
  'chat-noir-blanc-dort-coussin': { src: 'assets/scene/chat-noir-blanc-dort-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-noir-blanc-dort-sol': { src: 'assets/scene/chat-noir-blanc-dort-sol.webp', dx: -38, dy: -52, w: 76, h: 52 },
  'chat-ecaille-assis-coussin': { src: 'assets/scene/chat-ecaille-assis-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-ecaille-assis-sol': { src: 'assets/scene/chat-ecaille-assis-sol.webp', dx: -38, dy: -56, w: 76, h: 57 },
  'chat-ecaille-dort-coussin': { src: 'assets/scene/chat-ecaille-dort-coussin.webp', dx: -38, dy: -58, w: 76, h: 58 },
  'chat-ecaille-dort-sol': { src: 'assets/scene/chat-ecaille-dort-sol.webp', dx: -38, dy: -52, w: 76, h: 52 }
};

/** clients assis : CLIENTS_ASSIS[idTable][place][modèle]
    place  = ordre de remplissage de la maquette (0 = 1re place occupée, 1 = 2e…)
    modèle = 0 à 5, les six clients de la maquette (chapeau, violet, nœud, casquette, lunettes, mamie) */
export const NB_MODELES_CLIENTS = 6;
export const CLIENTS_ASSIS: Record<number, ImageScene[][]> = {
  1: [
    [{ src: 'assets/scene/client-t1-p1-m1.webp', x: 153, y: 213, w: 64, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p1-m2.webp', x: 158, y: 213, w: 54, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p1-m3.webp', x: 153, y: 213, w: 64, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p1-m4.webp', x: 158, y: 213, w: 54, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p1-m5.webp', x: 158, y: 213, w: 54, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p1-m6.webp', x: 158, y: 213, w: 54, h: 66, z: 297 }],
    [{ src: 'assets/scene/client-t1-p2-m1.webp', x: 108, y: 213, w: 64, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p2-m2.webp', x: 113, y: 213, w: 54, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p2-m3.webp', x: 108, y: 213, w: 64, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p2-m4.webp', x: 113, y: 213, w: 54, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p2-m5.webp', x: 113, y: 213, w: 54, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p2-m6.webp', x: 113, y: 213, w: 54, h: 66, z: 297 }],
    [{ src: 'assets/scene/client-t1-p3-m1.webp', x: 198, y: 213, w: 64, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p3-m2.webp', x: 203, y: 213, w: 54, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p3-m3.webp', x: 198, y: 213, w: 64, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p3-m4.webp', x: 203, y: 213, w: 54, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p3-m5.webp', x: 203, y: 213, w: 54, h: 66, z: 297 }, { src: 'assets/scene/client-t1-p3-m6.webp', x: 203, y: 213, w: 54, h: 66, z: 297 }],
    [{ src: 'assets/scene/client-t1-p4-m1.webp', x: 38, y: 233, w: 64, h: 76, z: 294 }, { src: 'assets/scene/client-t1-p4-m2.webp', x: 43, y: 233, w: 54, h: 76, z: 294 }, { src: 'assets/scene/client-t1-p4-m3.webp', x: 38, y: 233, w: 64, h: 76, z: 294 }, { src: 'assets/scene/client-t1-p4-m4.webp', x: 43, y: 233, w: 54, h: 76, z: 294 }, { src: 'assets/scene/client-t1-p4-m5.webp', x: 43, y: 233, w: 54, h: 76, z: 294 }, { src: 'assets/scene/client-t1-p4-m6.webp', x: 43, y: 233, w: 54, h: 76, z: 294 }],
    [{ src: 'assets/scene/client-t1-p5-m1.webp', x: 38, y: 271, w: 64, h: 76, z: 332 }, { src: 'assets/scene/client-t1-p5-m2.webp', x: 43, y: 271, w: 54, h: 76, z: 332 }, { src: 'assets/scene/client-t1-p5-m3.webp', x: 38, y: 271, w: 64, h: 76, z: 332 }, { src: 'assets/scene/client-t1-p5-m4.webp', x: 43, y: 271, w: 54, h: 76, z: 332 }, { src: 'assets/scene/client-t1-p5-m5.webp', x: 43, y: 271, w: 54, h: 76, z: 332 }, { src: 'assets/scene/client-t1-p5-m6.webp', x: 43, y: 271, w: 54, h: 76, z: 332 }],
    [{ src: 'assets/scene/client-t1-p6-m1.webp', x: 38, y: 309, w: 64, h: 76, z: 370 }, { src: 'assets/scene/client-t1-p6-m2.webp', x: 43, y: 309, w: 54, h: 76, z: 370 }, { src: 'assets/scene/client-t1-p6-m3.webp', x: 38, y: 309, w: 64, h: 76, z: 370 }, { src: 'assets/scene/client-t1-p6-m4.webp', x: 43, y: 309, w: 54, h: 76, z: 370 }, { src: 'assets/scene/client-t1-p6-m5.webp', x: 43, y: 309, w: 54, h: 76, z: 370 }, { src: 'assets/scene/client-t1-p6-m6.webp', x: 43, y: 309, w: 54, h: 76, z: 370 }]
  ],
  2: [
    [{ src: 'assets/scene/client-t2-p1-m1.webp', x: 272, y: 173, w: 64, h: 76, z: 261 }, { src: 'assets/scene/client-t2-p1-m2.webp', x: 277, y: 173, w: 54, h: 76, z: 261 }, { src: 'assets/scene/client-t2-p1-m3.webp', x: 272, y: 173, w: 64, h: 76, z: 261 }, { src: 'assets/scene/client-t2-p1-m4.webp', x: 277, y: 173, w: 54, h: 76, z: 261 }, { src: 'assets/scene/client-t2-p1-m5.webp', x: 277, y: 173, w: 54, h: 76, z: 261 }, { src: 'assets/scene/client-t2-p1-m6.webp', x: 277, y: 173, w: 54, h: 76, z: 261 }],
    [{ src: 'assets/scene/client-t2-p2-m1.webp', x: 364, y: 173, w: 64, h: 76, z: 261 }, { src: 'assets/scene/client-t2-p2-m2.webp', x: 369, y: 173, w: 54, h: 76, z: 261 }, { src: 'assets/scene/client-t2-p2-m3.webp', x: 364, y: 173, w: 64, h: 76, z: 261 }, { src: 'assets/scene/client-t2-p2-m4.webp', x: 369, y: 173, w: 54, h: 76, z: 261 }, { src: 'assets/scene/client-t2-p2-m5.webp', x: 369, y: 173, w: 54, h: 76, z: 261 }, { src: 'assets/scene/client-t2-p2-m6.webp', x: 369, y: 173, w: 54, h: 76, z: 261 }]
  ],
  3: [
    [{ src: 'assets/scene/client-t3-p1-m1.webp', x: 513, y: 223, w: 64, h: 66, z: 299 }, { src: 'assets/scene/client-t3-p1-m2.webp', x: 518, y: 223, w: 54, h: 66, z: 299 }, { src: 'assets/scene/client-t3-p1-m3.webp', x: 513, y: 223, w: 64, h: 66, z: 299 }, { src: 'assets/scene/client-t3-p1-m4.webp', x: 518, y: 223, w: 54, h: 66, z: 299 }, { src: 'assets/scene/client-t3-p1-m5.webp', x: 518, y: 223, w: 54, h: 66, z: 299 }, { src: 'assets/scene/client-t3-p1-m6.webp', x: 518, y: 223, w: 54, h: 66, z: 299 }],
    [{ src: 'assets/scene/client-t3-p2-m1.webp', x: 446, y: 243, w: 64, h: 76, z: 303 }, { src: 'assets/scene/client-t3-p2-m2.webp', x: 451, y: 243, w: 54, h: 76, z: 303 }, { src: 'assets/scene/client-t3-p2-m3.webp', x: 446, y: 243, w: 64, h: 76, z: 303 }, { src: 'assets/scene/client-t3-p2-m4.webp', x: 451, y: 243, w: 54, h: 76, z: 303 }, { src: 'assets/scene/client-t3-p2-m5.webp', x: 451, y: 243, w: 54, h: 76, z: 303 }, { src: 'assets/scene/client-t3-p2-m6.webp', x: 451, y: 243, w: 54, h: 76, z: 303 }],
    [{ src: 'assets/scene/client-t3-p3-m1.webp', x: 580, y: 243, w: 64, h: 76, z: 303 }, { src: 'assets/scene/client-t3-p3-m2.webp', x: 585, y: 243, w: 54, h: 76, z: 303 }, { src: 'assets/scene/client-t3-p3-m3.webp', x: 580, y: 243, w: 64, h: 76, z: 303 }, { src: 'assets/scene/client-t3-p3-m4.webp', x: 585, y: 243, w: 54, h: 76, z: 303 }, { src: 'assets/scene/client-t3-p3-m5.webp', x: 585, y: 243, w: 54, h: 76, z: 303 }, { src: 'assets/scene/client-t3-p3-m6.webp', x: 585, y: 243, w: 54, h: 76, z: 303 }],
    [{ src: 'assets/scene/client-t3-p4-m1.webp', x: 513, y: 276, w: 64, h: 77, z: 336 }, { src: 'assets/scene/client-t3-p4-m2.webp', x: 518, y: 276, w: 54, h: 77, z: 336 }, { src: 'assets/scene/client-t3-p4-m3.webp', x: 513, y: 276, w: 64, h: 77, z: 336 }, { src: 'assets/scene/client-t3-p4-m4.webp', x: 518, y: 276, w: 54, h: 77, z: 336 }, { src: 'assets/scene/client-t3-p4-m5.webp', x: 518, y: 276, w: 54, h: 77, z: 336 }, { src: 'assets/scene/client-t3-p4-m6.webp', x: 518, y: 276, w: 54, h: 77, z: 336 }]
  ],
  4: [
    [{ src: 'assets/scene/client-t4-p1-m1.webp', x: 653, y: 215, w: 64, h: 76, z: 275 }, { src: 'assets/scene/client-t4-p1-m2.webp', x: 658, y: 215, w: 54, h: 76, z: 275 }, { src: 'assets/scene/client-t4-p1-m3.webp', x: 653, y: 215, w: 64, h: 76, z: 275 }, { src: 'assets/scene/client-t4-p1-m4.webp', x: 658, y: 215, w: 54, h: 76, z: 275 }, { src: 'assets/scene/client-t4-p1-m5.webp', x: 658, y: 215, w: 54, h: 76, z: 275 }, { src: 'assets/scene/client-t4-p1-m6.webp', x: 658, y: 215, w: 54, h: 76, z: 275 }],
    [{ src: 'assets/scene/client-t4-p2-m1.webp', x: 753, y: 215, w: 64, h: 76, z: 275 }, { src: 'assets/scene/client-t4-p2-m2.webp', x: 758, y: 215, w: 54, h: 76, z: 275 }, { src: 'assets/scene/client-t4-p2-m3.webp', x: 753, y: 215, w: 64, h: 76, z: 275 }, { src: 'assets/scene/client-t4-p2-m4.webp', x: 758, y: 215, w: 54, h: 76, z: 275 }, { src: 'assets/scene/client-t4-p2-m5.webp', x: 758, y: 215, w: 54, h: 76, z: 275 }, { src: 'assets/scene/client-t4-p2-m6.webp', x: 758, y: 215, w: 54, h: 76, z: 275 }]
  ],
  5: [
    [{ src: 'assets/scene/client-t5-p1-m1.webp', x: 679, y: 373, w: 64, h: 66, z: 451 }, { src: 'assets/scene/client-t5-p1-m2.webp', x: 684, y: 373, w: 54, h: 66, z: 451 }, { src: 'assets/scene/client-t5-p1-m3.webp', x: 679, y: 373, w: 64, h: 66, z: 451 }, { src: 'assets/scene/client-t5-p1-m4.webp', x: 684, y: 373, w: 54, h: 66, z: 451 }, { src: 'assets/scene/client-t5-p1-m5.webp', x: 684, y: 373, w: 54, h: 66, z: 451 }, { src: 'assets/scene/client-t5-p1-m6.webp', x: 684, y: 373, w: 54, h: 66, z: 451 }],
    [{ src: 'assets/scene/client-t5-p2-m1.webp', x: 727, y: 373, w: 64, h: 66, z: 451 }, { src: 'assets/scene/client-t5-p2-m2.webp', x: 732, y: 373, w: 54, h: 66, z: 451 }, { src: 'assets/scene/client-t5-p2-m3.webp', x: 727, y: 373, w: 64, h: 66, z: 451 }, { src: 'assets/scene/client-t5-p2-m4.webp', x: 732, y: 373, w: 54, h: 66, z: 451 }, { src: 'assets/scene/client-t5-p2-m5.webp', x: 732, y: 373, w: 54, h: 66, z: 451 }, { src: 'assets/scene/client-t5-p2-m6.webp', x: 732, y: 373, w: 54, h: 66, z: 451 }],
    [{ src: 'assets/scene/client-t5-p3-m1.webp', x: 614, y: 387, w: 64, h: 76, z: 459 }, { src: 'assets/scene/client-t5-p3-m2.webp', x: 619, y: 387, w: 54, h: 76, z: 459 }, { src: 'assets/scene/client-t5-p3-m3.webp', x: 614, y: 387, w: 64, h: 76, z: 459 }, { src: 'assets/scene/client-t5-p3-m4.webp', x: 619, y: 387, w: 54, h: 76, z: 459 }, { src: 'assets/scene/client-t5-p3-m5.webp', x: 619, y: 387, w: 54, h: 76, z: 459 }, { src: 'assets/scene/client-t5-p3-m6.webp', x: 619, y: 387, w: 54, h: 76, z: 459 }],
    [{ src: 'assets/scene/client-t5-p4-m1.webp', x: 792, y: 387, w: 64, h: 76, z: 459 }, { src: 'assets/scene/client-t5-p4-m2.webp', x: 797, y: 387, w: 54, h: 76, z: 459 }, { src: 'assets/scene/client-t5-p4-m3.webp', x: 792, y: 387, w: 64, h: 76, z: 459 }, { src: 'assets/scene/client-t5-p4-m4.webp', x: 797, y: 387, w: 54, h: 76, z: 459 }, { src: 'assets/scene/client-t5-p4-m5.webp', x: 797, y: 387, w: 54, h: 76, z: 459 }, { src: 'assets/scene/client-t5-p4-m6.webp', x: 797, y: 387, w: 54, h: 76, z: 459 }]
  ],
  6: [
    [{ src: 'assets/scene/client-t6-p1-m1.webp', x: 365, y: 387, w: 64, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p1-m2.webp', x: 370, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p1-m3.webp', x: 365, y: 387, w: 64, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p1-m4.webp', x: 370, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p1-m5.webp', x: 370, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p1-m6.webp', x: 370, y: 387, w: 54, h: 66, z: 469 }],
    [{ src: 'assets/scene/client-t6-p2-m1.webp', x: 365, y: 452, w: 64, h: 77, z: 512 }, { src: 'assets/scene/client-t6-p2-m2.webp', x: 370, y: 452, w: 54, h: 77, z: 512 }, { src: 'assets/scene/client-t6-p2-m3.webp', x: 365, y: 452, w: 64, h: 77, z: 512 }, { src: 'assets/scene/client-t6-p2-m4.webp', x: 370, y: 452, w: 54, h: 77, z: 512 }, { src: 'assets/scene/client-t6-p2-m5.webp', x: 370, y: 452, w: 54, h: 77, z: 512 }, { src: 'assets/scene/client-t6-p2-m6.webp', x: 370, y: 452, w: 54, h: 77, z: 512 }],
    [{ src: 'assets/scene/client-t6-p3-m1.webp', x: 411, y: 387, w: 64, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p3-m2.webp', x: 416, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p3-m3.webp', x: 411, y: 387, w: 64, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p3-m4.webp', x: 416, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p3-m5.webp', x: 416, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p3-m6.webp', x: 416, y: 387, w: 54, h: 66, z: 469 }],
    [{ src: 'assets/scene/client-t6-p4-m1.webp', x: 411, y: 452, w: 64, h: 77, z: 512 }, { src: 'assets/scene/client-t6-p4-m2.webp', x: 416, y: 452, w: 54, h: 77, z: 512 }, { src: 'assets/scene/client-t6-p4-m3.webp', x: 411, y: 452, w: 64, h: 77, z: 512 }, { src: 'assets/scene/client-t6-p4-m4.webp', x: 416, y: 452, w: 54, h: 77, z: 512 }, { src: 'assets/scene/client-t6-p4-m5.webp', x: 416, y: 452, w: 54, h: 77, z: 512 }, { src: 'assets/scene/client-t6-p4-m6.webp', x: 416, y: 452, w: 54, h: 77, z: 512 }],
    [{ src: 'assets/scene/client-t6-p5-m1.webp', x: 319, y: 387, w: 64, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p5-m2.webp', x: 324, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p5-m3.webp', x: 319, y: 387, w: 64, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p5-m4.webp', x: 324, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p5-m5.webp', x: 324, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p5-m6.webp', x: 324, y: 387, w: 54, h: 66, z: 469 }],
    [{ src: 'assets/scene/client-t6-p6-m1.webp', x: 319, y: 452, w: 64, h: 76, z: 512 }, { src: 'assets/scene/client-t6-p6-m2.webp', x: 324, y: 452, w: 54, h: 76, z: 512 }, { src: 'assets/scene/client-t6-p6-m3.webp', x: 319, y: 452, w: 64, h: 76, z: 512 }, { src: 'assets/scene/client-t6-p6-m4.webp', x: 324, y: 452, w: 54, h: 76, z: 512 }, { src: 'assets/scene/client-t6-p6-m5.webp', x: 324, y: 452, w: 54, h: 76, z: 512 }, { src: 'assets/scene/client-t6-p6-m6.webp', x: 324, y: 452, w: 54, h: 76, z: 512 }],
    [{ src: 'assets/scene/client-t6-p7-m1.webp', x: 457, y: 387, w: 64, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p7-m2.webp', x: 462, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p7-m3.webp', x: 457, y: 387, w: 64, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p7-m4.webp', x: 462, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p7-m5.webp', x: 462, y: 387, w: 54, h: 66, z: 469 }, { src: 'assets/scene/client-t6-p7-m6.webp', x: 462, y: 387, w: 54, h: 66, z: 469 }],
    [{ src: 'assets/scene/client-t6-p8-m1.webp', x: 457, y: 452, w: 64, h: 76, z: 512 }, { src: 'assets/scene/client-t6-p8-m2.webp', x: 462, y: 452, w: 54, h: 76, z: 512 }, { src: 'assets/scene/client-t6-p8-m3.webp', x: 457, y: 452, w: 64, h: 76, z: 512 }, { src: 'assets/scene/client-t6-p8-m4.webp', x: 462, y: 452, w: 54, h: 76, z: 512 }, { src: 'assets/scene/client-t6-p8-m5.webp', x: 462, y: 452, w: 54, h: 76, z: 512 }, { src: 'assets/scene/client-t6-p8-m6.webp', x: 462, y: 452, w: 54, h: 76, z: 512 }]
  ]
};
