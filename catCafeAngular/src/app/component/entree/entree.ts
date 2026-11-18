

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../service/client-service';
import { ReservationService } from '../../service/reservation-service';
import { TableService } from '../../service/table-service';
import { Client } from '../../model/client';
import { Reservation } from '../../model/reservation';
import { Table } from '../../model/table';

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

  protected clientForm!: FormGroup;
  protected prenomCtrl!: FormControl;
  protected nomCtrl!: FormControl;
  protected nbClientCtrl!: FormControl;
  protected editingClientId?: number;
  protected editingReservationId?: number;
  protected nbClient?: number;

  protected tables?: Table[];

  protected nbPersonnes= [1,2,3,4,5,6,7];


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
      };



      //this.LivreService.addObs(livre).subscribe(() => {
          //this.refresh$.next();});

      this.tableService.findByDisponible(this.nbClientCtrl.value).subscribe(tables => {

        this.tables=tables;
        console.log(tables);

        this.editingClientId = undefined;

        //this.tables=undefined;

        this.nbClient=this.nbClientCtrl.value;

        this.clientForm.reset();
        this.nbClientCtrl.reset();
        });


    }

}
