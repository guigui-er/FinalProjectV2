import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GerantConnexion } from '../model/gerant-connexion';
import { AuthResponse } from '../model/auth-response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GerantConnexionService {

  constructor(private http: HttpClient) {}

  public login(auth: GerantConnexion): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/gerant/auth', auth);
  }


}
