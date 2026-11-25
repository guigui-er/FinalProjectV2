import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Entree } from './component/entree/entree';

import { EcranPrincipal } from './page/ecran-principal/ecran-principal';

@Component({
  imports: [RouterOutlet,EcranPrincipal],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('CatCafé');
}
