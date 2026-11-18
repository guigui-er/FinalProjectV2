import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../model/reservation';


@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = '/reservation';

  public findAll(): Observable<Reservation[]> {
      return this.http.get<Reservation[]>(this.apiUrl);
  }

  public findById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${ this.apiUrl }/${ id }`);
  }



  public save(reservation: Reservation): Observable<Reservation> {
    if (!reservation.id) {
      return this.http.post<Reservation>(this.apiUrl, reservation);
    }

    return this.http.put<Reservation>(`${ this.apiUrl }/${ reservation.id }`, reservation);
  }

  public deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`${ this.apiUrl }/${ id }`);
  }
}
