import { Injectable, inject, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'Admin' | 'Manager' | 'Reception' | 'Maintenance' | 'SuperAdmin' | 'Staff';
}

import { Functions, httpsCallable } from '@angular/fire/functions';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth = inject(Auth);
  private router = inject(Router);
  private functions = inject(Functions);

  // Expose Firebase User as a signal
  user$ = user(this.auth);
  private firebaseUser = toSignal(this.user$);

  // Reactive role from Firestore profile
  public profileRole = signal<User['role'] | null>(null);

  // Computed "App User" with dynamic role
  currentUser = computed<User | null>(() => {
    const u = this.firebaseUser();
    if (!u) return null;

    // Hardcoded fallback for the primary workspace account
    let role = this.profileRole();
    if (!role && u.email === 'jruizdesign@gmail.com') {
      role = 'SuperAdmin';
    }

    return {
      id: u.uid,
      email: u.email || '',
      username: u.displayName || u.email || 'User',
      role: role || 'Staff'
    };
  });

  // Simplified permission check
  isManager = computed(() => {
    const role = this.currentUser()?.role;
    return role === 'Manager' || role === 'Admin' || role === 'SuperAdmin';
  });

  isLoggedIn() {
    return !!this.currentUser();
  }

  async verifyRecaptcha(action: string): Promise<number> {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.endsWith('.local')) {
      console.log('🛡️ Bypassing reCAPTCHA for local development');
      return 1.0;
    }
    try {
      const siteKey = '6Ldk8TssAAAAAHmIfBZ4GDSaaeR772oXEPSoVtfC';
      if (!window.grecaptcha) {
        console.warn('reCAPTCHA not loaded');
        return 1.0; // Fail open for now if script missing
      }
      const token = await window.grecaptcha.enterprise.execute(siteKey, { action });
      const verifyFn = httpsCallable<{ token: string; action: string }, { score: number }>(
        this.functions,
        'verifyRecaptcha'
      );
      const result = await verifyFn({ token, action });
      return result.data.score;
    } catch (e) {
      console.error('reCAPTCHA verification failed', e);
      return 1.0; // Fail OPEN for development purposes to avoid login lockouts
    }
  }

  async login(email: string, pass: string): Promise<void> {
    const score = await this.verifyRecaptcha('login');
    if (score < 0.5) {
      console.error('reCAPTCHA score too low:', score);
      throw new Error('Security check failed. Please try again.');
    }

    try {
      await signInWithEmailAndPassword(this.auth, email, pass);
    } catch (e: any) {
      console.error('Login failed', e);
      throw e;
    }
  }

  async signup(email: string, pass: string): Promise<void> {
    const score = await this.verifyRecaptcha('signup');
    if (score < 0.5) {
      console.error('reCAPTCHA score too low:', score);
      throw new Error('Security check failed. Please try again.');
    }

    try {
      await createUserWithEmailAndPassword(this.auth, email, pass);
    } catch (e: any) {
      console.error('Signup failed', e);
      throw e;
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}