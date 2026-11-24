import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ChatService } from '../../service/chat-service';
import { Observable, race, switchMap } from 'rxjs';
import { ChatMF } from '../../model/chat-mf';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatDTO } from '../../model/chat';
import { AdoptionChat } from '../../model/adoption-chat';

@Component({
  imports: [RouterLink,
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule],
  selector: 'app-page-chat',
  styleUrl: './page-chat.css',
  templateUrl: './page-chat.html',
})
export class PageChat {
  protected title: Title = inject(Title);

  protected service: ChatService = inject(ChatService);
  private formBuilder: FormBuilder = inject(FormBuilder);


  // Observables, $ signifie qu'il s'agit d'un stream
  protected chats$!:Observable<ChatDTO[]>
  protected chatId$!: Observable<ChatDTO>
  protected chatsNom$!: Observable<ChatDTO[]>
  protected chatsMF$!:Observable<ChatDTO[]>
  protected chatsAge$!: Observable<ChatDTO[]>
  protected chatsAdoptables$ !: Observable<ChatDTO[]>
  
  // Variables
  protected sexeChat !: ChatMF
  protected age !: number
  protected nom !: string
  protected showForm: boolean = false;
  protected chatForm!: FormGroup;
  protected showMessage:boolean = true;

  protected nomCtrl!: FormControl;
  protected raceCtrl!: FormControl;
  protected ageCtrl!: FormControl;
  protected sexeCtrl!: FormControl;
  protected adoptedCtrl!: FormControl;
  protected date_vetoCtrl!: FormControl;
  protected proprietaireCtrl!: FormControl;
  protected caractèreCtrl!: FormControl;

  protected editingChat!: ChatDTO | null;

  // Initiation
  ngOnInit(): void {
    this.title.setTitle("Les chats - ⚞^. .^⚟");
    this.chats$ = this.service.findAll();


    /*
    this.chatsMF$ = this.service.chatsParSexe(this.sexeChat);
    this.chatsAge$ = this.service.chatsParAge(this.age);
    this.chatsNom$ = this.service.chatsParNom(this.nom); 
    */

  this.nomCtrl = this.formBuilder.control('', Validators.required);
  this.raceCtrl = this.formBuilder.control('', Validators.required);
  this.ageCtrl = this.formBuilder.control('', Validators.required);
  this.sexeCtrl = this.formBuilder.control('', Validators.required);
  //this.adoptedCtrl = this.formBuilder.control('', Validators.required);
  this.date_vetoCtrl = this.formBuilder.control('', Validators.required);
  //this.proprietaireCtrl = this.formBuilder.control('', Validators.required);
  this.caractèreCtrl = this.formBuilder.control('', Validators.required);

  this.chatForm = this.formBuilder.group({
      nom: this.nomCtrl,
      race: this.raceCtrl,
      age: this.ageCtrl,
      sexe: this.sexeCtrl,
      // adopted: this.adoptedCtrl,
      date_veto: this.date_vetoCtrl,
      // clientId:this.proprietaireCtrl,
      // proprietaire:this.proprietaireCtrl,
      caractère:this.caractèreCtrl
    });
  
  }
// Méthodes
  voirChat(chat: ChatDTO): void {
    const id = chat['id'] as number;

    this.service.findById(id).subscribe({
      next: (resultat) => {
        console.log('Informations du chat :', resultat);
      },
      error: (erreur) => {
        console.error('Erreur lors de la récupération du chat', erreur);
      }
    });
  }

  supprimerChat(chat: ChatDTO): void {
    const id = chat['id'] as number;

    if (confirm('Voulez-vous vraiment supprimer ce chat ?')) {
      this.service.supprimerChat(id).subscribe({
        next: () => {
          alert('Chat supprimé !');
          this.chats$ = this.service.findAll();
        },
        error: (erreur) => {
          console.error('Erreur lors de la suppression', erreur);
        }
      });
    }
  }

  adopterChat(chat: AdoptionChat): void {
    this.service.adopterChat(chat).subscribe({
      next: () => {
        alert('Le chat a été adopté !');
        this.chats$;
      },
      error: (erreur) => {
        console.error('Erreur lors de l’adoption', erreur);
      }
    });
  }

  // Préparer la modification d'un chat
  modifierChat(chat: ChatDTO): void {
    this.showMessage = false;
    this.showForm = true;
    this.editingChat = chat;


    onclick 

    this.chatForm.patchValue({
      nom: chat.nom,
      race: chat.race,
      age: chat.age,
      sexe: chat.sexe,
      //adopted: chat.adopted,
      date_veto: chat.date_veto,
      //proprietaire: chat.proprietaire,
      caractère: chat.caractère
    });
  }

  editer(): void {

  // Si les infos en entrée sont fausses on sort de la méthode
  if (this.chatForm.invalid || !this.editingChat) {
    return;
  }

  // Récupération de l'id du chat qui va permettre d'utiliser la méthode modifierChat
  const id = this.editingChat.id;

  // Vu que id?:number dans l'interface, la méthode pourrait planter étant donné qu'elle attend un number et pas un undefined
  if (id === undefined) {
    console.error("Id du chat introuvable !");
    return;
  }

  // On crée une instance de chat qui remplacera la précédente après modif
  const chatModifie: ChatDTO = {
    ...this.editingChat,
    ...this.chatForm.value
  };

  // On appelle le service et on subscribe la nouvelle instance chatModifie
  this.service.modifierChat(id, chatModifie).subscribe({
    next: () => {
      alert('Chat modifié avec succès !');

      this.showForm = false;
      this.editingChat = null;
      this.showMessage = true;

      this.chats$ = this.service.findAll();
    },
    error: (erreur) => {
      console.error('Erreur lors de la modification :', erreur);
    }
  });
}

}
