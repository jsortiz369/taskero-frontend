import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/module.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
