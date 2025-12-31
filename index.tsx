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
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './src/firebase-config';
import { provideAppCheck, initializeAppCheck, ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';

const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  return router.parseUrl('/login');
};

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'overview', component: DailyOverviewComponent },
      { path: 'rooms', component: RoomManagerComponent },
      { path: 'guests', component: GuestManagerComponent },
      { path: 'staff', component: StaffManagerComponent },
      { path: 'maintenance', component: MaintenanceComponent },
      { path: 'accounting', component: AccountingComponent },
      { path: 'documents', component: DocumentCenterComponent },
      { path: 'logs', component: LogsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFunctions(() => getFunctions()),
    provideFirestore(() => getFirestore()),
    provideAppCheck(() => initializeAppCheck(undefined, {
      provider: new ReCaptchaEnterpriseProvider('6Ldk8TssAAAAAHmIfBZ4GDSaaeR772oXEPSoVtfC'),
      isTokenAutoRefreshEnabled: true
    }))
  ]
}).catch(err => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.
