import { Injectable, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'Admin' | 'Manager' | 'Reception' | 'Maintenance';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  // Expose Firebase User as a signal
  private firebaseUser = toSignal(user(this.auth));

  // Computed "App User" to maintain compatibility with existing components
  currentUser = computed<User | null>(() => {
    const u = this.firebaseUser();
    if (!u) return null;
    return {
      id: u.uid,
      email: u.email || '',
      username: u.displayName || u.email || 'User',
      role: 'Manager' // Defaulting to Manager for simplified access
    };
  });

  // Simplified permission check
  isManager = computed(() => !!this.currentUser());

  isLoggedIn() {
    return !!this.currentUser();
  }

  async login(email: string, pass: string): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, email, pass);
      this.router.navigate(['/dashboard']);
      return true;
    } catch (e) {
      console.error('Login failed', e);
      return false;
    }
  }

  async signup(email: string, pass: string): Promise<boolean> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, pass);
      this.router.navigate(['/dashboard']);
      return true;
    } catch (e) {
      console.error('Signup failed', e);
      return false;
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}