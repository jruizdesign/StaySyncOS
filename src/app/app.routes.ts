import { Routes, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs/operators';

// Services
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

// Components
import { HomeComponent } from '../../home.component';
import { ItCybersecurityComponent } from '../../it-cybersecurity.component';
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

// Guards
export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.user$.pipe(
        map(user => {
            if (user) {
                return true;
            }
            return router.parseUrl('/login');
        })
    );
};

export const loginGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.user$.pipe(
        map(user => {
            if (!user) {
                return true;
            }
            return router.parseUrl('/dashboard');
        })
    );
};

export const setupGuard: CanActivateFn = () => {
    const data = inject(DataService);
    const router = inject(Router);

    return toObservable(data.currentHotelQuery.data).pipe(
        filter(d => d !== undefined),
        take(1),
        map((d: any) => {
            if (d?.hotel) {
                return true;
            }
            return router.parseUrl('/setup');
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
