import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = '/client';

  public findAll(): Observable<Client[]> {
      return this.http.get<Client[]>(this.apiUrl);
  }

  public findById(id: number): Observable<Client> {
    return this.http.get<Client>(`${ this.apiUrl }/${ id }`);
  }

  public save(client: Client): Observable<Client> {
    if (!client.id) {
      return this.http.post<Client>(this.apiUrl, client);
    }

    return this.http.put<Client>(`${ this.apiUrl }/${ client.id }`, client);
  }

  public deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${ this.apiUrl }/${ id }`);
  }
}
