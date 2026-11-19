import { Genre } from "./genre"

export interface Client {
    id?: number,
    nom: string,
    prenom: string
    genre:Genre
}
