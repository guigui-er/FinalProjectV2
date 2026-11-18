import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Entree } from './component/entree/entree';

@Component({
  imports: [RouterOutlet,Entree],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('catCafeAngular');
}
