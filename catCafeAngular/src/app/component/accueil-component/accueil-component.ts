import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-acceuil-component',
  styleUrl: './accueil-component.css',
  templateUrl: './accueil-component.html',
})
export class AccueilComponent {
  porteOuverte =  false; 
  choixConnexOuvert = false;

 constructor(
    private router: Router,
  ) {}

  ouverturePorte() : void{
    this.porteOuverte = !this.porteOuverte;
    this.choixConnexOuvert = this.porteOuverte;
  }

  fermerFenetreConnexion(){
    this.choixConnexOuvert=false;
  }

  connexionClient(){
    this.router.navigate(['entree'])
  }

  connexionGerant(){
    this.router.navigate(['gerant'])
  }

}
