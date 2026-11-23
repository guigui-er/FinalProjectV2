import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GerantConnexion } from '../model/gerant-connexion';
import { AuthResponse } from '../model/auth-response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GerantConnexionService {

  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public login(auth: GerantConnexion): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/gerant/auth`, auth);
  }


}
