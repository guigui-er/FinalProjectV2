import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Entree } from './component/entree/entree';
import { PopupClientOrGerant } from './component/popup-client-or-gerant/popup-client-or-gerant';

@Component({
  imports: [RouterOutlet, PopupClientOrGerant],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  //protected readonly title = signal('catCafeAngular');
}
