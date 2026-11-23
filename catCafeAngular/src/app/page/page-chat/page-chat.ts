import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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


  ngOnInit(): void {
    this.title.setTitle("${nom}");

  
}
