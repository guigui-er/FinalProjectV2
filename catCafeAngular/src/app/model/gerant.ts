import { Genre } from "./genre";

export interface Gerant {
    id:number;
    nom:string;
    prenom:string;
    genre:Genre;
    login:string;
    password:string;
    salaire:number;
}
