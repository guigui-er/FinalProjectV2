import { Component, input, OnInit, output } from '@angular/core';
import { CommandeService } from '../../service/commande-service';
import { Observable } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Article } from '../../model/article';
import { CommandeModel } from '../../model/commande-model';
import { DetailCommande } from '../../model/detail-commande';
import { Router } from '@angular/router';
import { Reservation } from '../../model/reservation';

@Component({
  imports: [AsyncPipe, DecimalPipe],
  selector: 'app-commande',
  styleUrl: './commande.css',
  templateUrl: './commande.html',
})
export class Commande implements OnInit {
  // Les listes récupérées depuis le backend
  protected boissonschaudes$!: Observable<Article[]>;
  protected boissonsfroides$!: Observable<Article[]>;
  // protected alimentaires$!: Observable<Article[]>;
  // Les différentes listes en fonctions du type d'aliments !
  protected gateaux$!: Observable<Article[]>;
  protected plats$!: Observable<Article[]>;
  protected glaces$!: Observable<Article[]>;
  protected recettesSpeciales$!: Observable<Article[]>;

  fermerPopup = output<void>()

  reservation = input.required<Reservation>();

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
    private commandeService: CommandeService,
    private router: Router // Plus besoin, utilisé quand commande était en mode page avec les routers 
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
  protected creerCle(article: Article, categorie: string): string {
    return categorie + '-' + article.id;
  }

  // Récupérer la QUANTITE d'un article sélectionné
  protected getQuantite(article: Article, categorie: string): number {
    const cle = this.creerCle(article, categorie); // On récupère la clé de l'article.
    // Si l'article existe dans le panier, on retourne sa quantité. Sinon, on retourne 0.
    return this.panier[cle] ? this.panier[cle].qte : 0;
  }


  // -------------- AJOUTER un article avec le bouton + ! ---------------------
  protected ajouter(article: Article, categorie: string): void {
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
  protected retirer(article: Article, categorie: string): void {
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

  // Calculer le montant Total
  protected getTotal(): number {
    let somme = 0;
    // On parcourt chaque article présent dans le panier
    Object.values(this.panier).forEach(article => {
      const ligneTotal = article.prix * article.qte;
      somme += ligneTotal;
    });
    return somme;
  }

  // ---- Calculer le nombre total d'articles sélectionnés -----
  protected getNombreArticles(): number {
    let nombre = 0;
    // On parcourt chaque article présent dans le panier
    Object.values(this.panier).forEach(article => {
      nombre += article.qte;
    });

    return nombre;
  }

  // ------ METHODE COMMANDER, au clique du bouton commander !
  protected commander(): void {

    const articles = Object.values(this.panier);
    if (articles.length === 0) {
      return;
    }

    // 1. Créer la commande
    const nouvelleCommande : CommandeModel = {
      date: new Date().toISOString().slice(0, 19), //Format attendu par LocalDateTime en Java !
      accepter_paiement: false,
      statutCommande: 'Servie',
      reservation: this.reservation(),
    };

    this.commandeService.creerCommande(nouvelleCommande).subscribe({

      next: (commandeCreee: CommandeModel) => {
        // Récupérer et vérifier l'identifiant de la commande
        const commandeId = commandeCreee.id;

        if (commandeId === undefined) {
          console.error('La commande créée ne possède pas d’identifiant.');
          alert('Erreur : identifiant de commande introuvable.');
          return;
        }

        let nombreDetailsCrees = 0;

        // 2. Créer un détail pour chaque article
        articles.forEach(article => {
          const detail : DetailCommande = {
            qte: article.qte,
            prix: article.prix,
            commandeId: commandeId,
            articleId: article.articleId
          };

          this.commandeService.creerDetailCommande(detail).subscribe({

            next: () => {
              nombreDetailsCrees++;

              // Vérifier si tous les détails ont été créés
              if (nombreDetailsCrees === articles.length) {

                alert('Votre commande a bien été enregistrée !');

                // Vider le panier
                this.panier = {};
                //Fermer la popup
                this.fermerPopup.emit();
              }
            },

            error: (erreur) => {
              console.error('Erreur lors de la création du détail :', erreur);
              alert('Erreur lors de l’enregistrement d’un article.');
            }
          });
        });
      },

      error: (erreur) => {
        console.error('Erreur lors de la création de la commande :', erreur);
        alert('Impossible de créer la commande.');
      }
    });
  }

  // Plus besoin, utilisé quand commande était en mode page avec les routers
  // Retourner au salon
  protected fermerCommande(): void {
    this.router.navigate(['/ecranPrincipal']);
  }
}
