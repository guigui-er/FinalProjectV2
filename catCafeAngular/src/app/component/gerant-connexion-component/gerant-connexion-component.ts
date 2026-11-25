import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GerantConnexionService } from '../../service/gerant-connexion-service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Title } from '@angular/platform-browser';


@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-gerant-connexion-component',
  styleUrl: './gerant-connexion-component.css',
  templateUrl: './gerant-connexion-component.html',
})
export class GerantConnexionComponent implements OnInit{
  protected formLoginGroup!: FormGroup;
  protected formLoginUsernameCtrl!: FormControl;
  protected formLoginPasswordCtrl!: FormControl;
  protected erreurMessage = '';

  constructor(
    private gerantConnexService: GerantConnexionService,
    private router:Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private titleService: Title
  ){}

  ngOnInit(): void {
    this.titleService.setTitle('Connexion gérant — CatCafé');
    this.formLoginUsernameCtrl = this.formBuilder.control("", Validators.required);
    this.formLoginPasswordCtrl = this.formBuilder.control("",[Validators.required, Validators.minLength(2)]); //voir pour rajouter caractére spéciaux et majuscule

    this.formLoginGroup = this.formBuilder.group({
      username: this.formLoginUsernameCtrl,
      password: this.formLoginPasswordCtrl
    });
  }

  protected login() {
    this.erreurMessage = '';

    this.gerantConnexService.login(this.formLoginGroup.getRawValue()).subscribe({

      // next => si la réponse HTTP est OK (200)
      next:resp => {
        if (resp.success && resp.token) {
        // On affecte le jeton JWT reçu au service
        this.gerantConnexService.token = resp.token;
        // On redirige vers la page du gérant
        this.router.navigate(['gerantPage']);
        }
        else {
        this.erreurMessage = 'Identifiants invalides.';
        }
      },

      // error => si la réponse est KO (30X, 40X, 50X)
      error:(err) =>{
        this.erreurMessage = 'Erreur de connexion'
      }

    });
  }

  protected fermerPage() {

    this.location.back();
  }

}
