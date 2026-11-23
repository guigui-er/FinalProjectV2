import { CommandeResponse } from "./commande-response";
import { DetailCommandeResponse } from "./detail-response";

export interface TableReservationsResponse{

    id:number;
    dateTime:string;
    assiseId: number;
    clientNom: string;
    clientPrenom: string;
    nbClient: number;
    commandeId:number; 
    idReservation:number;
    prixTotal:number;
    commandeResponse: CommandeResponse;
    accepterPaiement:boolean;
    commandeStatut:string;
}