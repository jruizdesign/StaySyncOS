import 'zone.js';
import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
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
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth();
      if (isLocal) {
        console.log(`🔗 Connecting to Auth Emulator at http://127.0.0.1:9099`);
        connectAuthEmulator(auth, `http://127.0.0.1:9099`, { disableWarnings: true });
      }
      return auth;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (isLocal) {
        console.log(`🔗 Connecting to Storage Emulator at http://127.0.0.1:9199`);
        connectStorageEmulator(storage, '127.0.0.1', 9199);
      }
      return storage;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      if (isLocal) {
        console.log(`🔗 Connecting to Functions Emulator at http://127.0.0.1:5001`);
        connectFunctionsEmulator(functions, '127.0.0.1', 5001);
      }
      return functions;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (isLocal) {
        console.log(`🔗 Connecting to Firestore Emulator at http://127.0.0.1:8080`);
        connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
      }
      return firestore;
    }),
    provideDataConnect(() => {
      const dc = getDataConnect(getApp(), connectorConfig);
      if (isLocal) {
        console.log(`🔗 Connecting to Data Connect Emulator at http://127.0.0.1:9399`);
        connectDataConnectEmulator(dc, '127.0.0.1', 9399);
      }
      return dc;
    }),
    // App Check disabled for localhost stability
    provideAngularQuery(new QueryClient({
      defaultOptions: {
        queries: {
          retry: isLocal ? 0 : 3,
          staleTime: 1000 * 60, // 1 minute
        }
      }
    }))
  ]
}).catch(err => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.
