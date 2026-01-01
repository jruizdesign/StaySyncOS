import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppComponent } from './src/app.component';
import { routes } from './src/app/app.routes';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDataConnect, getDataConnect } from '@angular/fire/data-connect';
import { firebaseConfig } from './src/firebase-config';
import { connectorConfig } from './src/dataconnect-generated';
import { provideAppCheck, initializeAppCheck, ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';
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
