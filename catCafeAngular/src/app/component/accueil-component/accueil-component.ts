import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-acceuil-component',
  styleUrl: './accueil-component.css',
  templateUrl: './accueil-component.html',
})
export class AccueilComponent implements OnInit{
  protected title: Title = inject(Title);
  porteOuverte =  false;
  choixConnexOuvert = false;

 constructor(
    private router: Router,
  ) {}
  ngOnInit(): void {

    this.title.setTitle("Entrée CatCafé ⚞^. .^⚟");}

  protected ouverturePorte() : void{
    this.porteOuverte = !this.porteOuverte;
    this.choixConnexOuvert = this.porteOuverte;
  }

  protected fermerFenetreConnexion(){
    this.choixConnexOuvert=false;
  }

  protected connexionClient(){
    this.router.navigate(['client'])
  }

  protected connexionGerant(){
    this.router.navigate(['gerant'])
  }

}
