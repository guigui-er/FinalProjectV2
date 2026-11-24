import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-popup-client-or-gerant',
  styleUrl: './popup-client-or-gerant.css',
  templateUrl: './popup-client-or-gerant.html',
})
export class PopupClientOrGerant {

    constructor(
    private router: Router
  ) { }

  protected EntreeClient(): void {
    this.router.navigate([ '/client' ]);
  }


}
