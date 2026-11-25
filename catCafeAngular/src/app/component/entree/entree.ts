import { Reservation } from './../../model/reservation';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ClientService } from '../../service/client-service';
import { ReservationService } from '../../service/reservation-service';
import { TableService } from '../../service/table-service';
import { Client } from '../../model/client';

import { Table } from '../../model/table';
import { Router } from '@angular/router';
import { Genre } from '../../model/genre';

@Component({
  imports: [CommonModule,ReactiveFormsModule],
  selector: 'app-entree',
  styleUrl: './entree.css',
  templateUrl: './entree.html',
})
export class Entree implements OnInit {

  private clientService: ClientService = inject(ClientService);
  private reservationService: ReservationService = inject(ReservationService);
  private tableService: TableService = inject(TableService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  protected clientForm!: FormGroup;
  protected prenomCtrl!: FormControl;
  protected nomCtrl!: FormControl;
  protected nbClientCtrl!: FormControl;
  protected editingClientId?: number;
  protected editingReservationId?: number;
  protected nbClient?: number;

  protected tables?: Table[];

  protected nbPersonnes= [1,2,3,4,5,6,7];

  constructor(
    private location: Location,
    
  ){}


  ngOnInit(): void {

    this.prenomCtrl = this.formBuilder.control('', Validators.required);
    this.nomCtrl = this.formBuilder.control('', Validators.required);
    this.nbClientCtrl = this.formBuilder.control('', Validators.required);

    this.clientForm = this.formBuilder.group({
      prenom: this.prenomCtrl,
      nom: this.nomCtrl
    });
  }



  protected ajouterClient() {

      if (this.clientForm.invalid) {
        return;
      }

      const client: Client = {
        id: this.editingClientId,
        nom:this.nomCtrl.value,
        prenom:this.prenomCtrl.value,
        genre:Genre.Femme
      };





      //this.LivreService.addObs(livre).subscribe(() => {
          //this.refresh$.next();});

      this.tableService.findByDisponible(this.nbClientCtrl.value).subscribe(tables => {

        this.tables=tables;
        console.log(tables);

        if (tables.length!=0)
        {
          const reservation: Reservation = {
            id:this.editingReservationId,
            dateTime: new Date(),
            nbClient: this.nbClientCtrl.value,
            client:client,
            };
          this.reservationService.ReservationForm=reservation;
          this.reservationService.Table=this.tables;
          this.router.navigate([ 'ecranPrincipal' ]);
        }

        this.editingClientId = undefined;
        this.editingReservationId = undefined;


        //this.tables=undefined;
        this.nbClient=this.nbClientCtrl.value;

        this.clientForm.reset();
        this.nbClientCtrl.reset();
        });


    }
      protected fermerPage() {

    this.location.back();
  }

}
