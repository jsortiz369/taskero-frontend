import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { CoreStorage } from '../../services/core-storage/core-storage';
import { EnumStorage } from '../../models/storage.model';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const _router$ = inject(Router);
  const _storage$ = inject(CoreStorage);

  const tokenLogin = _storage$.getItem(EnumStorage.TOKEN);
  if (!tokenLogin) return _router$.navigateByUrl('/auth/login');

  return true;
};
