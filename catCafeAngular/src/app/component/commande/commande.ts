import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../service/commande-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe],
  selector: 'app-commande',
  styleUrl: './commande.css',
  templateUrl: './commande.html',
})
export class Commande implements OnInit {
  protected boissonschaudes$!: Observable<any[]>;
  protected boissonsfroides$!: Observable<any[]>;

  // protected alimentaires$!: Observable<any[]>;
  protected gateaux$!: Observable<any[]>;
  protected plats$!: Observable<any[]>;
  protected glaces$!: Observable<any[]>;
  protected recettesSpeciales$!: Observable<any[]>;

  constructor(
    private commandeService: CommandeService
  ) {}
  
  ngOnInit(): void {

    //Récupération des boissons chaudes
    this.boissonschaudes$ = this.commandeService.findAllBoissonsChaudes();

    //Récupérations des boissons froides
    this.boissonsfroides$ = this.commandeService.findAllBoissonsFroides();

    // //Récupérations des alimentaires
    // this.alimentaires$ = this.commandeService.findAllAlimentaires();

    this.gateaux$ = this.commandeService.findAllGateaux();

    this.plats$ = this.commandeService.findAllPlats();

    this.glaces$ = this.commandeService.findAllGlaces();

    this.recettesSpeciales$ = this.commandeService.findAllRecettesSpeciales();
  }
}
