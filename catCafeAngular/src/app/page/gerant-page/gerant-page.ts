import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GerantService } from '../../service/gerant-service';
import { Observable, Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Reservation } from '../../model/reservation';
import { ChatDTO } from '../../model/chat';
import { Assise } from '../../model/assise';
import { Article } from '../../model/article';
import { StatsGerantResponse } from '../../model/stats-gerant';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { TableAssisesResponse } from '../../model/table-assise';
import { TableReservationsResponse } from '../../model/table-reservation';
import { Router } from '@angular/router';
import { GerantConnexionService } from '../../service/gerant-connexion-service';

@Component({
  imports: [RouterLink,CommonModule,AsyncPipe,DatePipe],
  selector: 'app-gerant-page',
  styleUrl: './gerant-page.css',
  templateUrl: './gerant-page.html',
})
export class GerantPage {

  protected title: Title = inject(Title);
  protected gerantService: GerantService = inject(GerantService);


  constructor(
    private gerantConnexService: GerantConnexionService,
    private router:Router,
  ){}


  protected reservations$!:Observable<Reservation[]>
  protected chats$!:Observable<ChatDTO[]>
  protected assises$!:Observable<Assise[]>
  protected articles$!:Observable<Article[]>

  protected statsData$?: Observable<StatsGerantResponse>;

  protected assisesEtat$!: Observable<TableAssisesResponse[]>;

  protected reservationsEtat$!: Observable<TableReservationsResponse[]>;

  ngOnInit(): void {
    this.title.setTitle("Page du gérant");

    this.reservations$ = this.gerantService.findAllReservations();
    this.chats$ = this.gerantService.findAllChats();
    this.assises$ = this.gerantService.findAllAssises();
    this.articles$ = this.gerantService.findAllArticles();

    this.statsData$ = this.gerantService.stats();
    this.assisesEtat$ = this.gerantService.findAllAssisesResponse();
    this.reservationsEtat$ = this.gerantService.findAllReservationsResponse();
  }

  protected clicRetourAuSalon(): void {
    this.router.navigate(['/ecranPrincipal/gerant']);
  }

  protected logout() {
    this.gerantConnexService.resetAuth();
    this.router.navigate(['ecranPrincipal'])
  }








}
