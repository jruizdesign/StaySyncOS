import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  auth = inject(AuthService);
  data = inject(DataService);
  router = inject(Router);

  mobileMenuOpen = signal(false);

  private allMenuItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'grid', restricted: false },
    { label: 'Daily Overview', route: '/overview', icon: 'clipboard-list', restricted: false },
    { label: 'Rooms', route: '/rooms', icon: 'home', restricted: false },
    { label: 'Guests', route: '/guests', icon: 'users', restricted: false },
    { label: 'Staff', route: '/staff', icon: 'briefcase', restricted: false },
    { label: 'Documents', route: '/documents', icon: 'folder', restricted: false },
    { label: 'Maintenance', route: '/maintenance', icon: 'tool', restricted: false },
    { label: 'Accounting', route: '/accounting', icon: 'dollar-sign', restricted: true },
    { label: 'System Logs', route: '/logs', icon: 'clipboard-list', restricted: true },
    { label: 'Settings', route: '/settings', icon: 'cog', restricted: true }, 
  ];

  constructor() {
    // Close mobile menu on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.mobileMenuOpen.set(false);
    });
  }

  menuItems = computed(() => {
    const isManager = this.auth.isManager();
    return this.allMenuItems.filter(item => isManager || !item.restricted);
  });

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }
}