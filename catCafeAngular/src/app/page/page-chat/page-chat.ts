import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ChatDTO, ChatService } from '../../service/chat-service';
import { Observable } from 'rxjs';
import { ChatMF } from '../../model/chat-mf';

@Component({
  imports: [RouterLink,
    CommonModule,
    AsyncPipe],
  selector: 'app-page-chat',
  styleUrl: './page-chat.css',
  templateUrl: './page-chat.html',
})
export class PageChat {
  protected title: Title = inject(Title);

  protected service: ChatService = inject(ChatService);

  // Observables
  protected chats$!:Observable<ChatDTO[]>
  protected chatsMF$!:Observable<ChatDTO[]>
  protected chatsAge$!: Observable<ChatDTO[]>
  protected chatsNom$!: Observable<ChatDTO[]>


  // Variables
  protected sexeChat !: ChatMF
  protected age !: number
  protected nom !: string

  // Initiation
  ngOnInit(): void {
    this.title.setTitle("${nom} - ⚞^. .^⚟");

    this.chats$ = this.service.findAll();
    this.chatsMF$ = this.service.findBySexe(this.sexeChat);
    this.chatsAge$ = this.service.findByAge(this.age);
    this.chatsNom$ = this.service.findByNom(this.nom); 

  }
}
