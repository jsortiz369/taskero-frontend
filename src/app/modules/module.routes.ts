import { Routes } from '@angular/router';
import { guardsGuard } from '../core/guards-guard';
import { guards2Guard } from '../core/guards2-guard';

export default [
  {
    path: '',
    canActivateChild: [guards2Guard],
    loadComponent: () => import('../layout/components/layout/layout').then((m) => m.Layout),
    loadChildren: () => import('./routes.routes'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/ui/layout/layout').then((m) => m.Layout),
    loadChildren: () => import('./auth/features/auth.routes'),
  },
] as Routes;
