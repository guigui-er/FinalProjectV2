import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GerantConnexion } from '../model/gerant-connexion';
import { AuthResponse } from '../model/auth-response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class GerantConnexionService {

  private readonly apiUrl = 'http://localhost:8080';
  private http: HttpClient = inject(HttpClient);
  private _token: string = sessionStorage.getItem("token") ?? "";

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
    sessionStorage.setItem("token", value);
  }


  public login(auth: GerantConnexion): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/gerant/auth`, auth);
  }

  
  public isLogged() {
    return !!this._token;
  }

  public resetAuth() {
    this._token = "";
    sessionStorage.removeItem("token");
  }

}
