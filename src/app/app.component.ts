import { Component }    from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService }  from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand bg-light px-3">
      <a class="navbar-brand" routerLink="/">MyEvents</a>
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" routerLink="/events">Eventos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/map">Mapa</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/stats">Estadísticas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/calendar">Calendario</a> <!-- ✅ NUEVO -->
        </li>
      </ul>
      <button *ngIf="auth.isLoggedIn()"
              class="btn btn-outline-danger"
              (click)="auth.logout()">
        Logout
      </button>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
    title = 'gestion-eventos'; // 👈 Esto es lo que el test espera
    
  constructor(public auth: AuthService) {
    console.log('AppComponent cargado ✔️');
  }
}
