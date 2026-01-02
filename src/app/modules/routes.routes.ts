import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./landing-page/landing-page').then((m) => m.LandingPage),
  },
] as Routes;
