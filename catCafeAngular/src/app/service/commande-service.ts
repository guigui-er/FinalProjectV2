import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../model/commande';
import { Article } from '../model/article';
import { DetailCommande } from '../model/detail-commande';
import { CommandeModel } from '../model/commande-model';


@Injectable({
  providedIn: 'root',
})
export class CommandeService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/';

    public trouverToutesLesCommandes(): Observable<Commande[]> {
      return this.http.get<Commande[]>(`${this.apiUrl}/commande/paiementDisponible`);
    }

    public payer(id: number): Observable<Commande> {
      return this.http.put<Commande>(`${this.apiUrl}/commande/${id}/statut/Terminee`, {});
    }
  
    //Récupérer les boissons chaudes
    public findAllBoissonsChaudes(): Observable<Article[]> {
        return this.http.get<any[]>(`${this.apiUrl}/boissons/chaudes`);
    }

    //Récupérer les boissons froides
    public findAllBoissonsFroides(): Observable<Article[]> {
        return this.http.get<any[]>(`${this.apiUrl}/boissons/froides`);
    }

    // Récupérer les aliments
    public findAllAlimentaires(): Observable<Article[]> {
        return this.http.get<any[]>(`${this.apiUrl}/alimentaires`);
    }

    // Récupérer les aliments de type Gateaux
    public findAllGateaux(): Observable<Article[]> {
        return this.http.get<any[]>(`${this.apiUrl}/alimentaires/type/gateau`);
    }

    // Récupérer les aliments de type Plats
    public findAllPlats(): Observable<Article[]> {
        return this.http.get<any[]>(`${this.apiUrl}/alimentaires/type/plat`);
    }

    // Récupérer les aliments de type Glaces
    public findAllGlaces(): Observable<Article[]> {
        return this.http.get<any[]>(`${this.apiUrl}/alimentaires/type/glace`);
    }

    // Récupérer les aliments de type RecettesSpeciales
    public findAllRecettesSpeciales(): Observable<Article[]> {
        return this.http.get<any[]>(`${this.apiUrl}/alimentaires/type/recetteSpeciale`);
    }

    // Créer une nouvelle commande
    public creerCommande(commande: CommandeModel): Observable<CommandeModel> {
        return this.http.post<CommandeModel>(`${this.apiUrl}/commande`,commande);
    }

    // Ajouter un détail à une commande
    public creerDetailCommande(detail: DetailCommande ): Observable<DetailCommande> {
        return this.http.post<DetailCommande>(`${this.apiUrl}/detailCommande`,detail);
    }

}
