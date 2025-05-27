// src/app/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container mt-5" style="max-width:400px">
      <h3 class="mb-4 text-center">Iniciar sesión</h3>
      
      <form (ngSubmit)="onLogin()">
        <input [(ngModel)]="email" name="email" placeholder="Correo electrónico"
               class="form-control mb-2" required type="email">
        <input [(ngModel)]="pass" name="pass" type="password"
               placeholder="Contraseña" class="form-control mb-3" required>

        <button class="btn btn-primary w-100 mb-2" [disabled]="loading">
          {{ loading ? 'Cargando...' : 'Ingresar' }}
        </button>
      </form>

      <button class="btn btn-danger w-100 mb-3" (click)="onGoogleLogin()" [disabled]="loading">
        <i class="bi bi-google"></i> Ingresar con Google
      </button>

      <p class="mt-3 text-center">
        ¿No tienes cuenta? <a routerLink="/register">Regístrate</a>
      </p>

      <button>Registrarse</button>
    </div>
  `
})
export class LoginComponent {
  email = '';
  pass = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.loading = true;
    this.auth.login(this.email, this.pass).subscribe({
      next: () => this.router.navigate(['/events']), // ← Aquí corregido
      error: err => {
        alert('Error al iniciar sesión: ' + err.message);
        this.loading = false;
      }
    });
  }

  onGoogleLogin() {
    this.loading = true;
    this.auth.loginWithGoogle().subscribe({
      next: () => this.router.navigate(['/events']), // ← Aquí también
      error: err => {
        alert('Error con Google: ' + err.message);
        this.loading = false;
      }
    });
  }
}
