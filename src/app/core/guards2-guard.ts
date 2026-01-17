import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, Router } from '@angular/router';

export const guards2Guard: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state) => {
  const router$ = inject(Router);
  return router$.navigateByUrl('/auth/register');
};
