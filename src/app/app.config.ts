import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';

import { customerConfigPrimeNG } from '../primeng';
import { routes } from './app.routes';
import interceptors from './core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    customerConfigPrimeNG(),
    provideHttpClient(withInterceptors(interceptors)),
    MessageService,
    ConfirmationService,
  ],
};
