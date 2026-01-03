import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppComponent } from './src/app.component';
import { routes } from './src/app/app.routes';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideStorage, getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { provideFunctions, getFunctions, connectFunctionsEmulator } from '@angular/fire/functions';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { provideDataConnect, getDataConnect, connectDataConnectEmulator } from '@angular/fire/data-connect';
import { firebaseConfig } from './src/firebase-config';
import { connectorConfig } from './src/dataconnect-generated';
import { provideAppCheck, initializeAppCheck, ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';

const isLocal = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname.endsWith('.local'));

if (isLocal) {
  console.log('🚀 Running in LOCAL EMULATOR mode');
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth();
      if (isLocal) {
        const host = window.location.hostname;
        console.log(`🔗 Connecting to Auth Emulator at http://${host}:9099`);
        connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true });
      }
      return auth;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (isLocal) connectStorageEmulator(storage, window.location.hostname, 9199);
      return storage;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      if (isLocal) connectFunctionsEmulator(functions, window.location.hostname, 5001);
      return functions;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (isLocal) connectFirestoreEmulator(firestore, window.location.hostname, 8080);
      return firestore;
    }),
    provideDataConnect(() => {
      const dc = getDataConnect(getApp(), connectorConfig);
      if (isLocal) connectDataConnectEmulator(dc, window.location.hostname, 9399);
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
