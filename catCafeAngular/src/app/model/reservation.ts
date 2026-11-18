import { Client } from "./client";
import { Table } from "./table";

export interface Reservation {
    id?: number,
    dateTime: string,
    nbClient: number,
    client:Client,
    assise:Table

}
