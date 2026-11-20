import { inject, Injectable, Service } from '@angular/core';
import { Gerant } from '../model/gerant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatsGerantResponse } from '../model/stats-gerant';
import { Reservation } from '../model/reservation';
import { Chat } from '../model/chat';
import { Assise } from '../model/assise';
import { Article } from '../model/article';
import { Boisson } from '../model/boisson';
import { Alimentaire } from '../model/alimentaire';
import { TableAssisesResponse } from '../model/table-assise';

@Injectable({
  providedIn: 'root',
})
export class GerantService {
    private apiUrl: string = "http://localhost:8080/api/gerant/stats";
    private http: HttpClient = inject(HttpClient);

    public stats(): Observable<StatsGerantResponse>{
        return this.http.get<StatsGerantResponse>(this.apiUrl);
    }

    public findAllAssisesResponse(): Observable<TableAssisesResponse[]>{
        return this.http.get<TableAssisesResponse[]>("http://localhost:8080/api/gerant/etattable");
    }

    public findAllReservations(): Observable<Reservation[]>{
        return this.http.get<Reservation[]>("http://localhost:8080/api/reservation");
    }

    public findAllChats(): Observable<Chat[]>{
        return this.http.get<Chat[]>("http://localhost:8080/api/chat");
    }

    public findAllAssises(): Observable<Assise[]>{
        return this.http.get<Assise[]>("http://localhost:8080/api/assise");
    }

    public findAllArticles(): Observable<Article[]>{
        return this.http.get<Article[]>("http://localhost:8080/api/article");
    }

    public saveBoisson(boisson:Boisson): Observable<Boisson>{
        return this.http.post<Boisson>("http://localhost:8080/api/boisson",boisson);
    }

    public saveAlimentaire(alimentaire:Alimentaire): Observable<Alimentaire>{
        return this.http.post<Alimentaire>("http://localhost:8080/api/alimentaire",alimentaire);
    }

    public saveChat(chat:Chat): Observable<Chat>{
        return this.http.post<Chat>("http://localhost:8080/api/chat",chat);
    }
}
