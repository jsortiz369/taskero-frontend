import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guardsGuard: CanActivateFn = (route, state) => {
  const router$ = inject(Router);
  return router$.navigateByUrl('/auth/login');
};
