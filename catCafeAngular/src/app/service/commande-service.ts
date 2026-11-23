import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl: string = "/commande";

    //Récupérer les boissons chaudes
    public findAllBoissonsChaudes(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/boissons/chaudes`);
    }

    //Récupérer les boissons froides
    public findAllBoissonsFroides(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/boissons/froides`);
    }


    // Récupérer les aliments
    public findAllAlimentaires(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/alimentaires`);
    }

    // Récupérer les serveurs
    public findAllServeurs(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/serveur`);
    }
}
