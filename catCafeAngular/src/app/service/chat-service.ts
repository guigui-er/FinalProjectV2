import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client';
import { Chat } from '../model/chat';



@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = '/chat';


  public findAll(): Observable<Chat[]> {
      return this.http.get<Chat[]>(`http://localhost:8080/api${this.apiUrl}`);
  }

  public findById(id: number): Observable<Chat> {
    return this.http.get<Chat>(`http://localhost:8080/api${this.apiUrl}/${ id }`);
  }

  public save(chat: Chat): Observable<Chat> {
    if (!chat.id) {
      return this.http.post<Chat>(`http://localhost:8080/api${this.apiUrl}`, chat);
    }

    return this.http.put<Chat>(`http://localhost:8080/api${this.apiUrl}/${ chat.id }`, chat);
  }

  public deleteById(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api${this.apiUrl}/${ id }`);
  }
}
