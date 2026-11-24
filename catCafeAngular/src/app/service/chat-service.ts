import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMF } from '../model/chat-mf';
import { ChatDTO } from '../model/chat';
import { AdoptionChat } from '../model/adoption-chat';
import { AdoptionResponse } from '../model/adoption-response';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
    // Gestion de l'url vers l'api chat, le lien sera dans l'interceptor et laisser que /chat
    private apiUrl: string = "http://localhost:8080/api/chat";
    private http: HttpClient = inject(HttpClient);

    // Fonctionnalités CRUD

    public findAll(): Observable<ChatDTO[]> {
        return this.http.get<ChatDTO[]>(this.apiUrl);
    }

    public findById(id:number): Observable<ChatDTO>{
        return this.http.get<ChatDTO>(`${this.apiUrl}/id/${ id }`)
    }

    public ajouterChat(chat:ChatDTO): Observable<ChatDTO>{
        return this.http.post<ChatDTO>(this.apiUrl,chat);
    }

    public modifierChat(id:number, chat:ChatDTO): Observable<ChatDTO>{
        return this.http.put<ChatDTO>(`${this.apiUrl}/id/${ id }`, chat)
    }

    public supprimerChat(id:number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/id/${ id }`)
    }

    // Fonctionnalités CatCafe

    public chatsParNom(nom: string): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(`${ this.apiUrl }/nom/${ nom }`);
    }

    public chatsParSexe(sexe: ChatMF): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(`${ this.apiUrl }/sexe/${ sexe }`);
    }

    public chatsParAge(age: number): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(`${ this.apiUrl }/age/${ age }`);
    }

    public chatsAdoptables(): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(`${this.apiUrl}/adoptable`)
    }

    // Méthode potentiellement pas fonctionnelle, nécessite un objet chatAdoptionRequest en entrée
    public adopterChat(chat:AdoptionChat): Observable<AdoptionResponse>{
        return this.http.post<AdoptionResponse>(`${this.apiUrl}/adopter`, chat)
    }

    /*
    public findByEndormiTrue(): Observable<ChatDTO[]>{
        const params = new HttpParams().set('endormi', 'true');
        return this.http.get<ChatDTO[]>(this.apiUrl, { params });
    }
    */
}
