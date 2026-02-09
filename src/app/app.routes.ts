import { Routes, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

// Services
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

// Components
import { HomeComponent } from '../components/home.component';
import { ItCybersecurityComponent } from '../components/it-cybersecurity.component';
import { SetupComponent } from '../components/setup.component';
import { LoginComponent } from '../components/login.component';
import { DashboardComponent } from '../components/dashboard.component';
import { DailyOverviewComponent } from '../components/daily-overview.component';
import { RoomManagerComponent } from '../components/room-manager.component';
import { GuestManagerComponent } from '../components/guest-manager.component';
import { StaffManagerComponent } from '../components/staff-manager.component';
import { MaintenanceComponent } from '../components/maintenance.component';
import { AccountingComponent } from '../components/accounting.component';
import { LogsComponent } from '../components/logs.component';
import { SettingsComponent } from '../components/settings.component';
import { DocumentCenterComponent } from '../components/document-center.component';
import { LandingComponent } from '../components/landing.component';

import { PropertySelectorComponent } from '../components/property-selector.component';

// Guards
export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    // Simple check on signal, assuming auth initializes fast enough or we accept a flicker login redirect
    // Ideally we would wait for initialization, but let's try direct check first
    const user = auth.currentUser();
    if (user) return true;

    // Fallback: Check if session is recovering
    // For now, redirect to login
    return router.parseUrl('/login');
};

export const loginGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const user = auth.currentUser();
    if (!user) return true;
    return router.parseUrl('/dashboard');
};

export const setupGuard: CanActivateFn = (route, state) => {
    const data = inject(DataService);
    const auth = inject(AuthService);
    const router = inject(Router);

    const user = auth.currentUser();
    if (!user) return router.parseUrl('/login');

    const profile = data.userProfile();

    // If no profile yet, maybe allow through or redirect to setup?
    // Let's allow dashboard if simplified
    if (!profile) return true; // Let component handle missing data or loading

    // If SuperAdmin or has multiple hotels, ensure one is selected
    const isSuperAdmin = profile.role === 'SuperAdmin' || user.email === 'jruizdesign@gmail.com';
    const hasMultiProps = profile.hotelIds && Array.isArray(profile.hotelIds) && profile.hotelIds.length > 0;

    if (!data.selectedHotelId() && (isSuperAdmin || hasMultiProps)) {
        return router.parseUrl('/select-property');
    }

    // If single property, data service likely auto-selected it or we should in component
    return true;
};

export const routes: Routes = [
    // Default route - using LandingComponent
    { path: '', component: LandingComponent, pathMatch: 'full' },

    // Public Routes
    { path: 'digital-solutions', component: HomeComponent },
    { path: 'it-cybersecurity', component: ItCybersecurityComponent },
    { path: 'login', component: LoginComponent, canActivate: [loginGuard] },

    // Authenticated Routes
    { path: 'select-property', component: PropertySelectorComponent, canActivate: [authGuard] },
    { path: 'setup', component: SetupComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard, setupGuard] },
    { path: 'overview', component: DailyOverviewComponent, canActivate: [authGuard, setupGuard] },
    { path: 'rooms', component: RoomManagerComponent, canActivate: [authGuard, setupGuard] },
    { path: 'guests', component: GuestManagerComponent, canActivate: [authGuard, setupGuard] },
    { path: 'staff', component: StaffManagerComponent, canActivate: [authGuard, setupGuard] },
    { path: 'documents', component: DocumentCenterComponent, canActivate: [authGuard, setupGuard] },
    { path: 'maintenance', component: MaintenanceComponent, canActivate: [authGuard, setupGuard] },
    { path: 'accounting', component: AccountingComponent, canActivate: [authGuard, setupGuard] },
    { path: 'logs', component: LogsComponent, canActivate: [authGuard, setupGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [authGuard, setupGuard] },

    // Fallback
    { path: '**', redirectTo: '' }
];


