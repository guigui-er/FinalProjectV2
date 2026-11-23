import { ChatMF } from "./chat-mf";
import { Client } from "./client";

export interface Chat {

    id?: number,
    nom: string,
    race: string,
    age:number,
    prenom: string
    sexe:ChatMF,
    adopted:boolean,
    proprietaire:Client


}







