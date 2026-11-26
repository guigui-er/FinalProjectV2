import { Table } from './../../model/table';
import { Component, inject, OnInit, output, signal } from '@angular/core';
import { CommandeService } from '../../service/commande-service';
import { map, Observable, tap } from 'rxjs';
import { Commande } from '../../model/commande';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CommandeDetail } from '../commande-detail/commande-detail';
import { TableService } from '../../service/table-service';

@Component({
  imports: [AsyncPipe, CurrencyPipe, CommandeDetail],
  selector: 'app-paiement',
  styleUrl: './paiement.css',
  templateUrl: './paiement.html',
})
export class Paiement implements OnInit {
  private commandeService: CommandeService = inject(CommandeService);
  private tableService: TableService = inject(TableService);
  protected commandes$!: Observable<Commande[]>;
  protected commandeSelectionnee = signal<Commande | null>(null);
  protected recap = signal<Commande | null>(null);
  fermerPopup = output<void>();

  ngOnInit(): void {
    this.chargerCommandes();
  }

  protected selectionner(commande: Commande): void {
    this.commandeSelectionnee.set(commande);
  }

  protected fermer(): void {
    this.commandeSelectionnee.set(null);
  }

  protected payerCommande(id: number): void {
    const commande = this.commandeSelectionnee();
    if (!commande) return;

    this.commandeService.payer(id).subscribe({
      next: (commandePayee: Commande) => {

        commandePayee.reservation.assise.complet=false;
        this.tableService.save(commandePayee.reservation.assise).subscribe(()=>{
        this.recap.set(commande);
        this.fermer();
        })

      },
      error: (err: any) => console.error('Paiement échoué', err),
    });
  }

  protected fermerRecap(): void {
    this.recap.set(null);
    this.fermerPopup.emit();
  }

  private chargerCommandes(): void {
    this.commandes$ = this.commandeService.trouverToutesLesCommandes().pipe(
      map(commandes =>
        [...commandes].sort((a, b) => a.reservation.assise.id - b.reservation.assise.id)
      )
    );
  }

}
