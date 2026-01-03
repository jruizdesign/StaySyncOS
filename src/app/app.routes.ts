import { Routes, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { doc } from 'firebase/firestore';
import { docData } from '@angular/fire/firestore';

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
    return auth.user$.pipe(
        map(user => {
            console.log('[AuthGuard] Checking user:', user?.uid, 'for url:', state.url);
            if (user) {
                return true;
            }
            console.log('[AuthGuard] No user, redirecting to /login');
            return router.parseUrl('/login');
        })
    );
};

export const loginGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.user$.pipe(
        map(user => {
            console.log('[LoginGuard] Checking user:', user?.uid);
            if (!user) {
                return true;
            }
            console.log('[LoginGuard] User found, redirecting to /dashboard');
            return router.parseUrl('/dashboard');
        })
    );
};

export const setupGuard: CanActivateFn = (route, state) => {
    const data = inject(DataService);
    const auth = inject(AuthService);
    const router = inject(Router);
    const firestore = data.firestore;

    return auth.user$.pipe(
        filter(u => u !== undefined),
        take(1),
        switchMap(user => {
            if (!user) return of(router.parseUrl('/login'));

            return docData(doc(firestore, `users/${user.uid}`)).pipe(
                take(1),
                map((profile: any) => {
                    // 1. SuperAdmin & Multi-property check
                    const isSuperAdmin = profile?.role === 'SuperAdmin';
                    const hasMultiProps = profile?.hotelIds && Array.isArray(profile.hotelIds) && profile.hotelIds.length > 0;

                    if (isSuperAdmin || hasMultiProps) {
                        // If multiple hotels or SuperAdmin, user MUST have a selected Hotel ID to pass this guard
                        if (data.selectedHotelId()) {
                            return true;
                        }
                        // Otherwise, redirect to selector
                        return router.parseUrl('/select-property');
                    }

                    // 2. Single property check
                    if (profile && profile.hotelId) {
                        return true;
                    }

                    return router.parseUrl('/setup');
                })
            );
        })
    );
};

export const routes: Routes = [
    // Default route - using LandingComponent
    { path: '', component: LandingComponent, pathMatch: 'full' },

    // Public Routes
    { path: 'digital-solutions', component: HomeComponent },
    { path: 'it-cybersecurity', component: ItCybersecurityComponent },
    { path: 'login', component: LoginComponent, canActivate: [loginGuard] },

    // Authenticated Routes
    { path: 'select-property', component: PropertySelectorComponent, canActivate: [authGuard] }, // New Route
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


