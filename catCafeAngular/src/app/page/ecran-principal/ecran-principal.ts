import { ReservationService } from './../../service/reservation-service';


import { Component, inject } from '@angular/core';
import { ClientService } from '../../service/client-service';
import { Client } from '../../model/client';

import { Reservation } from '../../model/reservation';
import { DatePipe } from '@angular/common';
import { Table } from '../../model/table';
import { TableService } from '../../service/table-service';
import { Router } from '@angular/router';

@Component({
  imports: [DatePipe],
  selector: 'app-ecran-principal',
  styleUrl: './ecran-principal.css',
  templateUrl: './ecran-principal.html',
})
export class EcranPrincipal {

  private reservationService: ReservationService = inject(ReservationService);
  private clientService: ClientService = inject(ClientService);
  private tableService: TableService = inject(TableService);
  private router: Router = inject(Router);

  protected reservation:Reservation=this.reservationService.ReservationForm;


  protected tables?: Table[];


  protected tabledispo:Table[]=this.reservationService.Table;

  protected SelectionTable(tableSelect:Table): void {

      const client: Client = this.reservationService.ReservationForm.client;
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

        this.reservationService.save(reserv).subscribe(() => {

        });

        }
        );

  }

    protected EntreeClient(): void {
    this.router.navigate([ '/client' ]);
  }

}
