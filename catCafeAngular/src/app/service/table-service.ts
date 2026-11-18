import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../model/table';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = '/assise';

  public findAll(): Observable<Table[]> {
      return this.http.get<Table[]>(`http://localhost:8080/api${this.apiUrl}`);
  }

  public findById(id: number): Observable<Table> {
    return this.http.get<Table>(`http://localhost:8080/api${ this.apiUrl }/${ id }`);
  }

  public findByDisponible(capacite: number): Observable<Table[]> {
    return this.http.get<Table[]>(`http://localhost:8080/api${ this.apiUrl }/disponibles`,{params:{capacite}});
  }

  public save(table: Table): Observable<Table> {
    if (!table.id) {
      return this.http.post<Table>(`http://localhost:8080/api${this.apiUrl}`, table);
    }

    return this.http.put<Table>(`http://localhost:8080/api${ this.apiUrl }/${ table.id }`, table);
  }



  public deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${ this.apiUrl }/${ id }`);
  }
}
