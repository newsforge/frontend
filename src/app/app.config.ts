import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { firebaseAuthInterceptor } from './core/interceptors/firebase-auth.interceptor';

const firebaseConfig = {
  apiKey: 'AIzaSyDqdl5g7RjcWHKqd7XQkF1-33nmdJ4pWBI',
  authDomain: 'news-forge.firebaseapp.com',
  projectId: 'news-forge',
  storageBucket: 'news-forge.firebasestorage.app',
  messagingSenderId: '854040740058',
  appId: '1:854040740058:web:39f7cac43bc409bd0025e3',
  measurementId: 'G-1LJNGZQX21',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule
    ),
    provideHttpClient(withFetch(), withInterceptors([firebaseAuthInterceptor])),
  ],
};
