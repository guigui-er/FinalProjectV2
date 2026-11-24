import { DetailCommandeResponse } from "./detail-response";

export interface CommandeResponse {
  commandeId: number;
  idReservation: number;
  details: DetailCommandeResponse[];
  prixTotal: number;
}