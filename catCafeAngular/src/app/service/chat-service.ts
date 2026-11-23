import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMF } from '../model/chat-mf';

export interface ChatDTO {
    [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
    // Gestion de l'url vers l'api chat, le lien sera dans l'interceptor et laisser que /chat
    private apiUrl: string = "http://localhost:8080/api/chat";
    private http: HttpClient = inject(HttpClient);

    public findAll(): Observable<ChatDTO[]> {
        return this.http.get<ChatDTO[]>(this.apiUrl);
    // Requête standard correspondant à l'url de base pas besoin de modif
    }

    public findByNom(nom: string): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(`${ this.apiUrl }/nom/${ nom }`);
    // Si je fais ma requête comme ça, il faut qu'elle apparaisse côté back
    // Autrement il faut préciser les paramètres souhaités dans la def de la méthode
    }

    public findBySexe(sexe: ChatMF): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(`${ this.apiUrl }/sexe/${ sexe }`);
    }

    /*
    public findByEndormiTrue(): Observable<ChatDTO[]>{
        const params = new HttpParams().set('endormi', 'true');
        return this.http.get<ChatDTO[]>(this.apiUrl, { params });
    }
    */

    public findByAge(age: number): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(`${ this.apiUrl }/age/${ age }`);
    }

    public findAdoptable(): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(`${ this.apiUrl }/adoptable`);
    }

    public saveChat(chat:ChatDTO): Observable<ChatDTO>{
        return this.http.post<ChatDTO>(this.apiUrl,chat);
    }

}
