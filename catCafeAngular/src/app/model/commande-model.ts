export interface CommandeModel {

    id?: number; //Id facultatif car généré en autoincrement par le back
    date: string;
    accepter_paiement: boolean;
    statutCommande: string;
    
}
