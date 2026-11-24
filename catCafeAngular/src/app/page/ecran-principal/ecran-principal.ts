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


}
