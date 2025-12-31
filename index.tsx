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
import { provideDataConnect, getDataConnect } from '@angular/fire/data-connect';
import { firebaseConfig } from './src/firebase-config';
import { connectorConfig } from './src/dataconnect-generated';
import { provideAppCheck, initializeAppCheck, ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';

const authGuard: CanActivateFn = () => {
...
bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFunctions(() => getFunctions()),
    provideFirestore(() => getFirestore()),
    provideDataConnect(injector => {
      const dc = getDataConnect(injector);
      Object.assign(dc, connectorConfig);
      return dc;
    }),
    provideAppCheck(() => initializeAppCheck(undefined, {
      provider: new ReCaptchaEnterpriseProvider('6Ldk8TssAAAAAHmIfBZ4GDSaaeR772oXEPSoVtfC'),
      isTokenAutoRefreshEnabled: true
    }))
  ]
}).catch(err => console.error(err));


// AI Studio always uses an `index.tsx` file for all project types.
