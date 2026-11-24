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

  protected ouverturePorte() : void{
    this.porteOuverte = !this.porteOuverte;
    this.choixConnexOuvert = this.porteOuverte;
  }

  protected fermerFenetreConnexion(){
    this.choixConnexOuvert=false;
  }

  protected connexionClient(){
    this.router.navigate(['entree'])
  }

  protected connexionGerant(){
    this.router.navigate(['gerant'])
  }

}
