// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';

// --- IMPORTA Auth y los métodos TODOS desde @angular/fire/auth ---
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider
} from '@angular/fire/auth';

import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _uid: string | null = null;

  constructor(
    // Auth inyectable viene de '@angular/fire/auth'
    private auth: Auth,
    private router: Router
  ) {
    // Escuchamos cambios de sesión
    this.auth.onAuthStateChanged(user => {
      this._uid = user ? user.uid : null;
      if (!user) this.router.navigate(['/login']);
    });
  }

  /** Registro con email/password */
  register(email: string, pass: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, pass));
  }

  /** Login con email/password */
  login(email: string, pass: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, pass));
  }

  /** Login con Google */
  loginWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  /** Logout */
  logout() {
    signOut(this.auth).then(() => this.router.navigate(['/login']));
  }

  /** Devuelve true si hay un usuario autenticado */
  isLoggedIn(): boolean {
    return this._uid != null;
  }

  /** UID del usuario autenticado */
  get uid(): string {
    if (!this._uid) throw new Error('No authenticated');
    return this._uid;
  }
}
