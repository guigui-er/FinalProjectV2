import { DetailsCommande } from "./details-commande";
import { Reservation } from "./reservation";
import { Serveur } from "./serveur";
import { StatutCommande } from "./statut-commande";

export interface Commande {
    commandeId: number;
    date: string;
    statutCommande: StatutCommande;
    reservation: Reservation;
    details: DetailsCommande[];
    prixTotal: number;
}
