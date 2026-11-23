import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GerantConnexionService } from '../../service/gerant-connexion-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(
    private gerantConnexService: GerantConnexionService,
    private router:Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.formLoginUsernameCtrl = this.formBuilder.control("", Validators.required);
    this.formLoginPasswordCtrl = this.formBuilder.control("",[Validators.required, Validators.minLength(2)]); //voir pour rajouter caractére spéciaux et majuscule

    this.formLoginGroup = this.formBuilder.group({
      username: this.formLoginUsernameCtrl,
      password: this.formLoginPasswordCtrl
    });
  }

  protected login() {
    this.gerantConnexService.login(this.formLoginGroup.getRawValue()).subscribe(resp => {

      this.router.navigate(['pageGerant'])//mettre le vrai nom de la page gérant 
    })
  }

}
