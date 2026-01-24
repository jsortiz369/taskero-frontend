import { Routes } from '@angular/router';

import { confirmAccountGuard, loggedInGuard, notLoggedInGuard } from '../core/guards';

export default [
  {
    path: 'auth',
    canActivate: [notLoggedInGuard],
    canActivateChild: [confirmAccountGuard],
    loadComponent: () => import('./auth/ui/layout/layout').then((m) => m.Layout),
    loadChildren: () => import('./auth/features/auth.routes'),
  },
  {
    path: '',
    canActivate: [loggedInGuard],
    loadComponent: () => import('../layout/components/layout/layout').then((m) => m.Layout),
  },
] as Routes;
