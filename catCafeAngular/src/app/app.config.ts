import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './interceptor/jwt-interceptor';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(), provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'fr-FR' }, // Par défaut normes US, par exemple €15 au lieu de 15€

    // Configuration du client HTTP
    provideHttpClient(
      // Avec les intercepteurs ...
      withInterceptors([
        jwtInterceptor, // JWT Interceptor
      ])
    )
  ]
};
