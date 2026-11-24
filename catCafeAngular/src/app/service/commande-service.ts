import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
    private apiUrl: string = "http://localhost:8080/api";
    private http: HttpClient = inject(HttpClient);
    

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

    // Récupérer les aliments de type Gateaux
    public findAllGateaux(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/alimentaires/type/gateau`);
    }

    // Récupérer les aliments de type Plats
    public findAllPlats(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/alimentaires/type/plat`);
    }

    // Récupérer les aliments de type Glaces
    public findAllGlaces(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/alimentaires/type/glace`);
    }

    // Récupérer les aliments de type RecettesSpeciales
    public findAllRecettesSpeciales(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/alimentaires/type/recetteSpeciale`);
    }

    // Créer une nouvelle commande
    public creerCommande(commande: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/commande`,commande);
    }

    // Ajouter un détail à une commande
    public creerDetailCommande(detail: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/detailCommande`,detail);
    }

}
