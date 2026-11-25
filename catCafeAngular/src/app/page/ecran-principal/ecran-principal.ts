import { ReservationService } from './../../service/reservation-service';


import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
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
import { ChatDTO } from '../../model/chat';

import { FOND_SALON, PREMIER_PLAN, DECOR_SALON, PORTE_ENTREE, PORTE_PRIVEE, COMPTOIR, CAISSE, CADENAS_SRC,
         TABLES_SALON, PLACES_CHATS, PELAGES_CHATS, IMAGES_CHATS, CLIENTS_ASSIS, NB_MODELES_CLIENTS,
         ImageChat, ImageScene, PlaceChat, TableScene } from './scene-salon';
import { Assise } from '../../model/assise';
import { Paiement } from '../../component/paiement/paiement';

@Component({
  imports: [DatePipe, AsyncPipe, Paiement],
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
  protected Tables$!: Observable<Assise[]>;
  protected Chats$!: Observable<ChatDTO[]>;
  protected statsChats$!: Observable<{ aAdopter: number; total: number }>;

  protected reservation!:Reservation;


  protected commandes?: Commande[];

  showPayment = signal(false);

  openPaiement() {
    this.showPayment.set(true);
  }

  @HostListener('document:keydown.escape')
  closePaiement() {
    this.showPayment.set(false);
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closePaiement();
    }
  }
  
  protected tabledispo:Assise[]=this.reservationService.Table;

    ngOnInit(): void {

       this.reservation=this.reservationService.ReservationForm;

        console.log(`this.reservation bdd ${this.reservation?.id}`);

      /*this.Commandes$ = this.refresh$.pipe(
        // On initialise notre Observable
        startWith(null),
        // Fonction qui sera déclenchée dès qu'une nouvelle valeur dans le flux arrivera
        switchMap(() => {
          return this.commandeService.findAllWithResa();
        })
      )*/ // Pas utile pour le moment a voir quand on aura tout 


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

  protected SelectionTable(tableSelect:Assise ): void {

      const client: Client = this.reservation.client;
      const table:Assise={
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
          this.reservationService.ReservationForm=this.reservation;
          this.reservationService.Table=[];
          this.tabledispo = [];


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
    this.router.navigate([ 'gerantPage' ]);
  }

    protected commande(): void {
      this.refresh$.next();
  }


    protected commander(tableSelect:Assise): void {


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
  protected tableBdd(tables: Assise[] | null, idTable: number): Assise | undefined {
    return tables?.find(t => t.id === idTable);
  }


  /* ----- État de l'affichage : À REMPLIR (ou à adapter) selon ta logique ----- */

  /** vrai quand un groupe choisit sa table : le salon passe en mode placement */
  protected sceneEnPlacement(): boolean {
    return !!this.reservation && !this.reservation.id ;
  }

  /** en mode placement : cette table convient-elle au groupe ? (jaune si oui, grisée avec cadenas sinon) */
  protected sceneTableEligible(idTable: number, table: Assise | undefined): boolean {
     if (!table) return false;                                   // pas de table en base : impossible
      if (this.tabledispo?.length) {
        return this.tabledispo.some(d => d.id === idTable);       // la liste calculée par ton formulaire décide
      }
      return false;
  }


  /** la table est-elle occupée ? (ellipse et plaque roses, clients assis) — par défaut : champ complet de ta base */
  protected sceneTableOccupee(idTable: number, table: Assise | undefined): boolean {
    return !!table?.complet;
  }

  /** le chat dort-il ? (image du chat couché) */
  protected sceneChatDort(chat: ChatDTO): boolean {
    return false;
  }

  /* ----- Clics sur la scène : À REMPLIR ----- */

  /** clic sur la porte « Entrée » */
  protected clicPorteEntree(): void {
    this.router.navigate([ 'client' ]);
  }

  /** clic sur la porte « Privé » */
  protected clicPortePrivee(): void {
    this.router.navigate([ 'gerantPage' ]);
  }

  /** clic sur le comptoir */
  protected clicComptoir(): void {
    this.openPaiement();
  }

  /** clic sur la caisse */
  protected clicCaisse(): void {
    this.openPaiement();
  }

  /** clic sur une table, ses sièges, ses clients ou sa bulle ; table = ta table en base, undefined si elle n'y est pas */
  protected clicTableSalon(idTable: number, table: Assise | undefined): void {

    if (!table) return;

      if (this.sceneEnPlacement()) {
        if (this.sceneTableEligible(idTable, table)) this.SelectionTable(table);
        return;
      }
      if (!this.sceneTableOccupee(idTable, table)) return;

      if (this.sceneTableOccupee(idTable, table) && !this.sceneEnPlacement()) {
        this.router.navigate([ 'gerant' ]);
        //this.passerCommande(resa);
        //return;
      }
    return;

}
  /** clic sur un chat */
  protected clicChatSalon(chat: ChatDTO): void {

    const id = chat.id;

    this.router.navigate([ `chat/${id}` ]);
  }







  /** la réservation en cours sur une table : la plus récente (plus grand id) dont l'assise est cette table */
  protected reservationEnCours(idTable: number, reservations: Reservation[] | null): Reservation | undefined {
    return reservations
      ?.filter(r => r.assise?.id === idTable)
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))[0];
  }

  /** les images des clients assis à une table : autant que nbClient, dans l'ordre des places de la maquette */
  protected clientsAssis(idTable: number, table: Assise | undefined, reservations: Reservation[] | null): ImageScene[] {
    if (!this.sceneTableOccupee(idTable, table)) return [];          // table libre : personne
    const resa = this.reservationEnCours(idTable, reservations);
    const places = CLIENTS_ASSIS[idTable] ?? [];
    const nb = Math.min(resa?.nbClient ?? 0, places.length);        // jamais plus que de places
    const graine = resa?.id ?? idTable;                              // même réservation = mêmes clients
    return places.slice(0, nb).map((modeles, k) => modeles[(graine * 7 + k) % NB_MODELES_CLIENTS]);
  }

  /** la commande en cours sur une table : la plus récente (plus grand id) de la réservation de cette table,
      hors commandes payées — adapte les statuts « payés » à ton enum */
  protected commandeEnCours(idTable: number, commandes: Commande[] | null): Commande | undefined {
    const STATUTS_TERMINES = ['PAYEE'];
    return commandes
      ?.filter(c => c.reservation?.assise?.id === idTable && !STATUTS_TERMINES.includes(String(c.statutCommande)))
      .sort((a, b) => (b.commandeId ?? 0) - (a.commandeId ?? 0))[0];
  }


  /** l'emplacement du i-ème chat (les emplacements sont réutilisés au-delà du 5e chat) */
  protected placeChat(i: number): PlaceChat {
    return PLACES_CHATS[i % PLACES_CHATS.length];
  }

  /** l'image du i-ème chat : son pelage, assis ou endormi, sur un coussin ou au sol */
  protected imageChat(chat: ChatDTO, i: number): ImageChat {
    const pelage = PELAGES_CHATS[i % PELAGES_CHATS.length];
    const pose = this.sceneChatDort(chat) ? 'dort' : 'assis';
    const support = this.placeChat(i).coussin ? 'coussin' : 'sol';
    return IMAGES_CHATS[`chat-${pelage}-${pose}-${support}`];
  }



}
