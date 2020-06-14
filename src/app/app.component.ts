import { Component } from '@angular/core';

@Component({
  selector: 'jedi',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{titulo}}</a>
    <ul class='nav nav-pills'>
      <li><a class='nav-link' [routerLink]="['/bemvindo']">Home</a></li>
      <li><a class='nav-link' [routerLink]="['/estudantes']">Lista de Estudantes</a></li>
    </ul>
  </nav>
  <div class=‘container>
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo: string = "Academia Jedi";
}
