import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../service/commande-service';
import { Observable } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe, DecimalPipe],
  selector: 'app-commande',
  styleUrl: './commande.css',
  templateUrl: './commande.html',
})
export class Commande implements OnInit {
  // Les listes récupérées depuis le backend
  protected boissonschaudes$!: Observable<any[]>;
  protected boissonsfroides$!: Observable<any[]>;

  // protected alimentaires$!: Observable<any[]>;
  // Les différentes listes en fonctions du type d'aliments ! 
  protected gateaux$!: Observable<any[]>;
  protected plats$!: Observable<any[]>;
  protected glaces$!: Observable<any[]>;
  protected recettesSpeciales$!: Observable<any[]>;

  // Le panier (temporaire) contient les articles sélectionnés
  protected panier: {
  [cle: string]: {
    articleId: number;
    description: string;
    prix: number;
    qte: number;
    categorie: string;
  }
  } = {}; // Le panier est vide au départ ! 

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

  // Créer une clé unique pour chaque article 
  protected creerCle(article: any, categorie: string): string {
    return categorie + '-' + article.id;
  }

  // Récupérer la QUANTITE d'un article sélectionné
  protected getQuantite(article: any, categorie: string): number {
    const cle = this.creerCle(article, categorie); // On récupère la clé de l'article.
    // Si l'article existe dans le panier, on retourne sa quantité. Sinon, on retourne 0.
    return this.panier[cle] ? this.panier[cle].qte : 0;
  }


  // -------------- AJOUTER un article avec le bouton + ! ---------------------
  protected ajouter(article: any, categorie: string): void {
    const cle = this.creerCle(article, categorie); // On récupère la clé de l'article
    // Vérifier si l'article existe déjà dans le panier
    if (this.panier[cle]) {
      // Si oui --> on augmente sa qté ! 
      this.panier[cle].qte++;
    } else {
      // Sinon --> on crée une nouvelle ligne dans le panier avec qte = 1 ! 
      this.panier[cle] = {
        articleId: article.id,
        description: article.description,
        prix: Number(article.prix),
        qte: 1,
        categorie: categorie
      };
    }
  }

  // -------------- AJOUTER un article avec le bouton + ! ---------------------
  protected retirer(article: any, categorie: string): void {
    const cle = this.creerCle(article, categorie); // On récupère la clé de l'article
    // Vérifier si l'article existe déjà dans le panier
    if (this.panier[cle]) {
      // Si oui --> on diminue sa qté !
      this.panier[cle].qte--;
      // Si qté = 0 --> on supprime l'article du panier.
      if (this.panier[cle].qte === 0) {
        delete this.panier[cle];
      }
    }
  }

  // Calculer le Total
  protected getTotal(): number {
    let somme = 0;
    // On parcourt chaque article présent dans le panier
    Object.values(this.panier).forEach(article => {
      const ligneTotal = article.prix * article.qte;
      somme += ligneTotal;
    });
    return somme;
  } 

  // Calculer le nombre total d'articles sélectionnés
  protected getNombreArticles(): number {
    let nombre = 0;
    // On parcourt chaque article présent dans le panier
    Object.values(this.panier).forEach(article => {
      nombre += article.qte;
    });

    return nombre;
  }



}
