import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection, inject } from '@angular/core';
import { provideRouter, withHashLocation, Routes, CanActivateFn, Router } from '@angular/router';
import { AppComponent } from './src/app.component';
import { DashboardComponent } from './src/components/dashboard.component';
import { DailyOverviewComponent } from './src/components/daily-overview.component';
import { RoomManagerComponent } from './src/components/room-manager.component';
import { GuestManagerComponent } from './src/components/guest-manager.component';
import { StaffManagerComponent } from './src/components/staff-manager.component';
import { MaintenanceComponent } from './src/components/maintenance.component';
import { AccountingComponent } from './src/components/accounting.component';
import { LogsComponent } from './src/components/logs.component';
import { SettingsComponent } from './src/components/settings.component';
import { SetupComponent } from './src/components/setup.component';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs/operators';
import { LoginComponent } from './src/components/login.component';
import { DocumentCenterComponent } from './src/components/document-center.component';
import { AuthService } from './src/services/auth.service';
import { DataService } from './src/services/data.service';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDataConnect, getDataConnect } from '@angular/fire/data-connect';
import { firebaseConfig } from './src/firebase-config';
import { connectorConfig } from './src/dataconnect-generated';
import { provideAppCheck, initializeAppCheck, ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';

const authGuard: CanActivateFn = () => {
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

const loginGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.user$.pipe(
    map(user => {
      if (!user) {
        return true;
      }
      return router.parseUrl('/');
    })
  );
};

const setupGuard: CanActivateFn = () => {
  const data = inject(DataService);
  const router = inject(Router);

  // Check if hotel exists. Wait for data to be defined.
  // Note: firstHotelQuery.data is a signal.
  return toObservable(data.firstHotelQuery.data).pipe(
    filter(d => d !== undefined),
    take(1),
    map((d: any) => {
      const hasHotel = (d?.hotels?.length || 0) > 0;
      if (hasHotel) {
        return true;
      }
      return router.parseUrl('/setup');
    })
  );
};

import { LandingComponent } from './src/components/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
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
];

import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFunctions(() => getFunctions()),
    provideFirestore(() => getFirestore()),
    provideDataConnect(() => {
      const dc = getDataConnect(getApp(), connectorConfig);
      return dc;
    }),
    provideAppCheck(() => {
      if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        return undefined as any; // Disable App Check on localhost
      }
      return initializeAppCheck(undefined, {
        provider: new ReCaptchaEnterpriseProvider('6Ldk8TssAAAAAHmIfBZ4GDSaaeR772oXEPSoVtfC'),
        isTokenAutoRefreshEnabled: true
      });
    }),
    provideAngularQuery(new QueryClient())
  ]
}).catch(err => console.error(err));


// AI Studio always uses an `index.tsx` file for all project types.
