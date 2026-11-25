import { Assise } from "./assise";
import { Client } from "./client";

export interface Reservation {
    id: number;
    dateTime: string;
    nbClient: number;
    client: Client;
    assise:  Assise;
}
