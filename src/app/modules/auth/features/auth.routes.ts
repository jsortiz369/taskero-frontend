import { Routes } from '@angular/router';

import { confirmAccountGuard } from '../../../core/guards';

export default [
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.Register),
  },
  {
    path: 'confirm-account',
    loadComponent: () => import('./confirm-account/confirm-account').then((m) => m.ConfirmAccount),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
] as Routes;
