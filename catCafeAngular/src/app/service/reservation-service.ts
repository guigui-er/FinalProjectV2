import { Reservation } from './../model/reservation';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../model/table';



@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  private reservationForm!:Reservation;

  private tabledispo!:Table[];

  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = '/reservation';

  public get Table(): Table[]  {
    return this.tabledispo;
  }

    public set Table(table: Table[])  {
     this.tabledispo=table;
  }


  public get ReservationForm(): Reservation  {
    return this.reservationForm;
  }

  public set ReservationForm(reservation: Reservation) {
    this.reservationForm = reservation;
  }

  public findAll(): Observable<Reservation[]> {
      return this.http.get<Reservation[]>(`http://localhost:8080/api${this.apiUrl}`);
  }

  public findById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`http://localhost:8080/api${ this.apiUrl }/${ id }`);
  }



  public save(reservation: Reservation): Observable<Reservation> {
    if (!reservation.id) {
      return this.http.post<Reservation>(`http://localhost:8080/api${this.apiUrl}`, reservation);
    }

    return this.http.put<Reservation>(`http://localhost:8080/api${ this.apiUrl }/${ reservation.id }`, reservation);
  }

  public deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api${ this.apiUrl }/${ id }`);
  }
}
