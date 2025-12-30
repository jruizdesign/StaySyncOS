import { Injectable, signal, effect, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  username: string;
  hotelId: string;
  hotelName: string;
  role: 'Admin' | 'Manager' | 'Reception' | 'Maintenance';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);

  // Helper to check for elevated permissions
  isManager = computed(() => {
    const role = this.currentUser()?.role;
    return role === 'Admin' || role === 'Manager';
  });

  constructor(private router: Router) {
    // Check for existing session
    const saved = localStorage.getItem('staysync_auth');
    if (saved) {
      this.currentUser.set(JSON.parse(saved));
    }

    // Persist session
    effect(() => {
      if (this.currentUser()) {
        localStorage.setItem('staysync_auth', JSON.stringify(this.currentUser()));
      } else {
        localStorage.removeItem('staysync_auth');
      }
    });
  }

  login(username: string, password: string): boolean {
    // Simulated Backend Logic
    
    // Admin / Manager Login
    if (username === 'admin' && password === 'admin123') {
      this.currentUser.set({
        id: 'u_1',
        username: 'admin',
        hotelId: 'h_1',
        hotelName: 'StaySyncOS Demo Hotel',
        role: 'Manager'
      });
      this.router.navigate(['/dashboard']);
      return true;
    }
    
    // Staff / Reception Login
    if (username === 'staff' && password === 'staff123') {
      this.currentUser.set({
        id: 'u_2',
        username: 'staff',
        hotelId: 'h_1',
        hotelName: 'StaySyncOS Demo Hotel',
        role: 'Reception'
      });
      this.router.navigate(['/dashboard']);
      return true;
    }

    // Maintenance Login
    if (username === 'tech' && password === 'tech123') {
      this.currentUser.set({
        id: 'u_3',
        username: 'tech',
        hotelId: 'h_1',
        hotelName: 'StaySyncOS Demo Hotel',
        role: 'Maintenance'
      });
      this.router.navigate(['/dashboard']);
      return true;
    }

    return false;
  }

  logout() {
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.currentUser() !== null;
  }
}