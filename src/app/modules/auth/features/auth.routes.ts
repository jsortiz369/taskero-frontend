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
    path: 'recover-password',
    loadComponent: () => import('./recover-password/recover-password').then((m) => m.RecoverPassword),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password').then((m) => m.ResetPassword),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
] as Routes;
