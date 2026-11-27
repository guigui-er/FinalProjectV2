import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../model/table';
import { Assise } from '../model/assise';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = '/assise';

  public findAll(): Observable<Assise[]> {
      return this.http.get<Assise[]>(`http://localhost:8080/api${this.apiUrl}`);
  }

  public findById(id: number): Observable<Assise> {
    return this.http.get<Assise>(`http://localhost:8080/api${ this.apiUrl }/${ id }`);
  }

  public findByDisponible(capacite: number): Observable<Assise[]> {
    return this.http.get<Assise[]>(`http://localhost:8080/api${ this.apiUrl }/disponibles`,{params:{capacite}});
  }

  public save(table: Assise): Observable<Assise> {
    if (!table.id) {
      return this.http.post<Assise>(`http://localhost:8080/api${this.apiUrl}`, table);
    }

    return this.http.put<Assise>(`http://localhost:8080/api${ this.apiUrl }/${ table.id }`, table);
  }



  public deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api${ this.apiUrl }/${ id }`);
  }
}
