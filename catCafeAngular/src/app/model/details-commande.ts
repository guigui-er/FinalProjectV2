import { Article } from "./article";
import { Commande } from "./commande";

export interface DetailsCommande {
    id: number;
    qte: number;
    prix: number;
    commandeId: Commande;
    article: Article;
}
