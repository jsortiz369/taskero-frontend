import { Routes } from '@angular/router';

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
    path: 'password-recover',
    loadComponent: () => import('./password-recovery/password-recovery').then((m) => m.PasswordRecovery),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
] as Routes;
