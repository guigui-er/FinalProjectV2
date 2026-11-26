import { Component, computed, input, output } from '@angular/core';
import { Commande } from '../../model/commande';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe,DatePipe],
  selector: 'app-commande-detail',
  styleUrl: './commande-detail.css',
  templateUrl: './commande-detail.html',
})
export class CommandeDetail {
  commande = input.required<Commande>();
  fermer = output<void>();
  payer = output<number>();

  protected enCours = computed(() => this.commande().statutCommande === 'En_cours');
}
