import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('../layout/components/layout/layout').then((m) => m.Layout),
    loadChildren: () => import('./routes.routes'),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },
] as Routes;
