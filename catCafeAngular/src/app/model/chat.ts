import { ChatMF } from "./chat-mf";
import { Client } from "./client";

export interface ChatDTO{

    id: number;
    nom: string;
    race: string;
    age: number;
    ageAnnees: number;
    sexe: ChatMF;       
    adopted: boolean;
    date_veto: string;
    proprietaire?: Client;
    endormi: boolean;
    satisfait: boolean;
    caresses: number;
    caractère: string;
    clientId:number
}
