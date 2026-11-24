import { ReservationService } from './../../service/reservation-service';


import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../service/client-service';
import { Client } from '../../model/client';

import { Reservation } from '../../model/reservation';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Table } from '../../model/table';
import { TableService } from '../../service/table-service';
import { Router } from '@angular/router';
import { map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { Commande } from '../../model/commande';
import { CommandeService } from '../../service/commande-service';
import { ChatService } from '../../service/chat-service';
import { Chat } from '../../model/chat';

import { FOND_SALON, PREMIER_PLAN, DECOR_SALON, PORTE_ENTREE, PORTE_PRIVEE, COMPTOIR, CAISSE, CADENAS_SRC,
         TABLES_SALON, PLACES_CHATS, PELAGES_CHATS, IMAGES_CHATS, ImageChat, PlaceChat } from './scene-salon';

@Component({
  imports: [DatePipe,AsyncPipe],
  selector: 'app-ecran-principal',
  styleUrl: './ecran-principal.css',
  templateUrl: './ecran-principal.html',
})
export class EcranPrincipal implements OnInit{

  private reservationService: ReservationService = inject(ReservationService);
  private clientService: ClientService = inject(ClientService);
  private commandeService: CommandeService = inject(CommandeService);
  private tableService: TableService = inject(TableService);
  private chatService: ChatService = inject(ChatService);
  private router: Router = inject(Router);


  private refresh$: Subject<void> = new Subject<void>();
  protected Commandes$!: Observable<Commande[]>;
  protected Reservations$!: Observable<Reservation[]>;
  protected Clients$!: Observable<Client[]>;
  protected Tables$!: Observable<Table[]>;
  protected Chats$!: Observable<Chat[]>;
  protected statsChats$!: Observable<{ aAdopter: number; total: number }>;

  protected reservation!:Reservation;


  protected commandes?: Commande[];


  protected tabledispo:Table[]=this.reservationService.Table;

    ngOnInit(): void {

       this.reservation=this.reservationService.ReservationForm;

      this.Commandes$ = this.refresh$.pipe(
        // On initialise notre Observable
        startWith(null),
        // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
        switchMap(() => {
          return this.commandeService.findAllWithResa();
        })
      )


      this.Reservations$ = this.refresh$.pipe(
        // On initialise notre Observable
        startWith(null),
        // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
        switchMap(() => {
          return this.reservationService.findAll();
        })
      );

      this.Clients$ = this.refresh$.pipe(
        // On initialise notre Observable
        startWith(null),
        // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
        switchMap(() => {
          return this.clientService.findAll();
        })
      );

      this.Tables$ = this.refresh$.pipe(
        // On initialise notre Observable
        startWith(null),
        // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
        switchMap(() => {
          return this.tableService.findAll();
        })
      );

      this.Chats$ = this.refresh$.pipe(
        // On initialise notre Observable
        startWith(null),
        // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
        switchMap(() => {
          return this.chatService.findAll();
        })
      );

      this.statsChats$ = this.Chats$.pipe(
      map(chats => ({
      aAdopter: chats.filter(c => !c.adopted).length,
      total: chats.length
      }))


);



  }

  protected SelectionTable(tableSelect:Table): void {

      const client: Client = this.reservation.client;
      const table:Table={
        id: tableSelect.id,
        complet:true,
        capacite:tableSelect.capacite,
      }


      this.clientService.save(client).subscribe(customer => {

        console.log(customer.id);

        const reserv:Reservation =
        {
          id:this.reservation.id,
          nbClient:this.reservation.nbClient,
          dateTime:this.reservation.dateTime,
          client:customer,
          assise:table
        }

        this.reservationService.save(reserv).subscribe(reservation => {

          console.log(`Avant affectation reservation bdd ${this.reservation.id}`);
          this.reservation=reservation;
          console.log(`Après affectation reservation bdd ${this.reservation.id}`);
          console.log(`Après affectation reservation bdd ${this.reservation.id}`);
          this.refresh$.next();
        });

        }
        );

  }

    protected EntreeClient(): void {
    this.router.navigate([ 'client' ]);
  }
      protected EntreeGerant(): void {
    this.router.navigate([ 'gerant' ]);
  }

    protected commande(): void {
      this.refresh$.next();
  }


    protected commander(tableSelect:Table): void {


  }

      protected InfosChats(): void {


  }

  protected readonly FOND_SALON = FOND_SALON;
  protected readonly PREMIER_PLAN = PREMIER_PLAN;
  protected readonly DECOR_SALON = DECOR_SALON;
  protected readonly PORTE_ENTREE = PORTE_ENTREE;
  protected readonly PORTE_PRIVEE = PORTE_PRIVEE;
  protected readonly COMPTOIR = COMPTOIR;
  protected readonly CAISSE = CAISSE;
  protected readonly CADENAS_SRC = CADENAS_SRC;
  protected readonly TABLES_SALON = TABLES_SALON;

  /** la table de ta base qui correspond à une table du salon (même id), ou undefined */
  protected tableBdd(tables: Table[] | null, idTable: number): Table | undefined {
    return tables?.find(t => t.id === idTable);
  }

  /** l'emplacement du i-ème chat (les emplacements sont réutilisés au-delà du 5e chat) */
  protected placeChat(i: number): PlaceChat {
    return PLACES_CHATS[i % PLACES_CHATS.length];
  }

  /** l'image du i-ème chat : son pelage, assis ou endormi, sur un coussin ou au sol */
  protected imageChat(chat: Chat, i: number): ImageChat {
    const pelage = PELAGES_CHATS[i % PELAGES_CHATS.length];
    const pose = this.sceneChatDort(chat) ? 'dort' : 'assis';
    const support = this.placeChat(i).coussin ? 'coussin' : 'sol';
    return IMAGES_CHATS[`chat-${pelage}-${pose}-${support}`];
  }

  /* ----- État de l'affichage : À REMPLIR selon ta logique ----- */

  /** vrai quand un groupe choisit sa table : le salon passe en mode placement */
  protected sceneEnPlacement(): boolean {
    return false;
  }

  /** en mode placement : cette table convient-elle au groupe ? (jaune si oui, grisée avec cadenas sinon) */
  protected sceneTableEligible(idTable: number, table: Table | undefined): boolean {


    return false;
  }

  /** la table est-elle occupée ? (ellipse et plaque roses) */
  protected sceneTableOccupee(idTable: number, table: Table | undefined): boolean {
    return false;
  }

  /** le chat dort-il ? (image du chat couché) */
  protected sceneChatDort(chat: Chat): boolean {
    return false;
  }

  /* ----- Clics sur la scène : À REMPLIR ----- */

  /** clic sur la porte « Entrée » */
  protected clicPorteEntree(): void {
    this.router.navigate([ '/client' ]);
  }

  /** clic sur la porte « Privé » */
  protected clicPortePrivee(): void {
    this.router.navigate([ '/gerant' ]);
  }

  /** clic sur le comptoir */
  protected clicComptoir(): void {
    this.router.navigate([ '/client' ]);
  }

  /** clic sur la caisse */
  protected clicCaisse(): void {
    this.router.navigate([ '/client' ]);
  }

  /** clic sur une table (ou ses sièges) ; table = la table de ta base, undefined si elle n'y est pas */
  protected clicTableSalon(idTable: number, table: Table | undefined): void {
    this.router.navigate([ '/client/' ]);
  }

  /** clic sur un chat */
  protected clicChatSalon(chat: Chat): void {
    this.router.navigate([ '/client' ]);
  }


}
