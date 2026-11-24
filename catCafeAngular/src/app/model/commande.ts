import { Reservation } from './reservation';
import { DetailCommande } from "./detail-commande";
import { StatutCommande } from "./statut-commande";

export interface Commande {

      id?: number,
      date: Date,
      statutCommande:StatutCommande,
      reservation: Reservation,
      details?:DetailCommande[],
      prixTotal:number
}


