import { Service } from '@angular/core';

@Service()
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
        return this.http.get<ChatDTO[]>(`${ this.apiUrl }/${ nom }`);
    // Si je fais ma requête comme ça, il faut qu'elle apparaisse côté back
    // Autrement il faut préciser les paramètres souhaités dans la def de la méthode
    }

    public findBySexe(sexe: ChatMF): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(`${ this.apiUrl }/${ id }`);
    }

    public findByEndormiTrue(): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(this.apiUrl, endormi);
    }

    public findByAge(age: number): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(this.apiUrl, age);
    }

    public findByAdoptedFalse(): Observable<ChatDTO[]>{
        return this.http.get<ChatDTO[]>(this.apiUrl, adopted);
    }

    public countByAdoptedFalse(): Observable<number>{
        return this.http.get<number>(this.apiUrl);
    }


}
