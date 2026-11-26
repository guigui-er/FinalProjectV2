import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output, Signal, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../service/chat-service';
import { Observable, switchMap, tap, map } from 'rxjs';
import { ChatDTO } from '../../model/chat';
import { AdoptionChat } from '../../model/adoption-chat';
import { ReservationService } from '../../service/reservation-service';
import { Client } from '../../model/client';

@Component({
  imports: [
    CommonModule,
    AsyncPipe
  ],
  selector: 'app-page-chat',
  styleUrl: './page-chat.css',
  templateUrl: './page-chat.html',
})
export class PageChat implements OnInit {

  

  protected title: Title = inject(Title);
  protected service: ChatService = inject(ChatService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reservationService =inject(ReservationService);

  // Observable contenant le chat affiché
  protected chatId$!: Observable<ChatDTO>;

  // Identifiant du client connecté
  // À récupérer depuis le système d'authentification
 // protected proprietaireId!: number;
    protected client?: Client; 


  chat = input.required<ChatDTO>();
  fermerPopupChat = output<void>();

  ngOnInit(): void {

    // this.chatId$ = this.route.paramMap.pipe(

    //   map(params => params.get('id')),

    //   switchMap(id => {

    //     if (!id || isNaN(Number(id))) {
    //       throw new Error("Identifiant du chat invalide !");
    //     }

    //     return this.service.findById(Number(id));

    //   }),

    //   tap(chat => {
    //     this.title.setTitle(`La page de ${chat.nom} - ⚞^. .^⚟`);
    //   })

    // );

    // this.client = this.reservationService.ReservationForm.client;
    // console.log(this.client.id, this.client.prenom, this.client.nom)

  }

  // Utiliser cette ligne dans le salon this.router.navigate(['/chat', chat.id]);

  adopterChat(chat: Signal<ChatDTO>): void {

    if (chat().id === undefined) {
      console.error("Identifiant du chat introuvable !");
      return;
    }

    if (!this.client) {
      alert("Vous devez être connecté pour adopter un chat.");
      return;
    }

    // Création de la demande d'adoption
    const demande: AdoptionChat = {
      chatId: chat().id,
      proprietaireId: this.client.id
    };

    this.service.adopterChat(demande).subscribe({

      next: (resultat) => {
        alert("Félicitations ! Vous avez adopté ce chat !");

        // Actualisation des informations du chat
        this.chatId$ = this.service.findById(chat().id!);
      },

      error: (erreur) => {
        console.error("Erreur lors de l'adoption :", erreur);

        alert(
          erreur.error?.message ||
          "Une erreur est survenue lors de l'adoption."
        );
      }

    });

  }

  formatAge(ageEnMois: number): string {
  const annees = Math.floor(ageEnMois / 12);
  const mois = ageEnMois % 12;

  if (mois === 0) {
    return `${annees} an${annees > 1 ? 's' : ''}`;
  }

  return `${annees > 0 ? annees + ' an' + (annees > 1 ? 's' : '') + ' et ' : ''}${mois} mois`;
}

}