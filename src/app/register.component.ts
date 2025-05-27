import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { RouterModule }from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  template: `
    <div class="container mt-5" style="max-width:400px">
      <h3 class="mb-4 text-center">Registro</h3>

      <form (ngSubmit)="onRegister()">
        <input [(ngModel)]="email" name="email" type="email"
               placeholder="Correo electrónico" class="form-control mb-2" required>
        <input [(ngModel)]="pass" name="pass" type="password"
               placeholder="Contraseña" class="form-control mb-3" required>
        <button class="btn btn-success w-100 mb-2" [disabled]="loading">
          {{ loading ? 'Registrando...' : 'Registrarse' }}
        </button>
      </form>

      <p class="mt-3 text-center">
        ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
      </p>
    </div>
  `
})
export class RegisterComponent {
  email = '';
  pass  = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.loading = true;
    this.auth.register(this.email, this.pass).subscribe({
      next: () => this.router.navigate(['/events']), // ← Ruta corregida
      error: err => {
        alert('Error al registrarse: ' + err.message);
        this.loading = false;
      }
    });
  }
}
