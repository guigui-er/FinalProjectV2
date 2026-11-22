
import { Commande } from './../model/commande';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CommandeService {



  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = '/commande';

  public findAll(): Observable<Commande[]> {
      return this.http.get<Commande[]>(`http://localhost:8080/api${this.apiUrl}`);
  }

    public findAllWithResa(): Observable<Commande[]> {
      return this.http.get<Commande[]>(`http://localhost:8080/api${this.apiUrl}/allObject`);
  }

  public findById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`http://localhost:8080/api${ this.apiUrl }/${ id }`);
  }



  public save(commande: Commande): Observable<Commande> {
    if (!commande.id) {
      return this.http.post<Commande>(`http://localhost:8080/api${this.apiUrl}`, commande);
    }

    return this.http.put<Commande>(`http://localhost:8080/api${ this.apiUrl }/${ commande.id }`, commande);
  }

  public deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api${ this.apiUrl }/${ id }`);
  }
}
