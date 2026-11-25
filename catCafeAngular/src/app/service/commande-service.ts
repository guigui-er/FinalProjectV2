import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../model/commande';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/commande';

  trouverToutesLesCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/paiementDisponible`);
  }
  
  payer(id: number): Observable<Commande> {
    return this.http.put<Commande>(`${this.apiUrl}/${id}/statut/Terminee`, {});
  }
}