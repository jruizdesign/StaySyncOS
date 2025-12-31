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
import { LoginComponent } from './src/components/login.component';
import { DocumentCenterComponent } from './src/components/document-center.component';
import { AuthService } from './src/services/auth.service';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDataConnect, getDataConnect } from '@angular/fire/data-connect';
import { firebaseConfig } from './src/firebase-config';
import { connectorConfig } from './src/dataconnect-generated';
import { provideAppCheck, initializeAppCheck, ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';
import { map } from 'rxjs/operators';

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

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'overview', component: DailyOverviewComponent, canActivate: [authGuard] },
  { path: 'rooms', component: RoomManagerComponent, canActivate: [authGuard] },
  { path: 'guests', component: GuestManagerComponent, canActivate: [authGuard] },
  { path: 'staff', component: StaffManagerComponent, canActivate: [authGuard] },
  { path: 'documents', component: DocumentCenterComponent, canActivate: [authGuard] },
  { path: 'maintenance', component: MaintenanceComponent, canActivate: [authGuard] },
  { path: 'accounting', component: AccountingComponent, canActivate: [authGuard] },
  { path: 'logs', component: LogsComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
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
      if (window.location.hostname === 'localhost') {
        (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = "DEBUG_TOKEN";
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
