import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { CoreStorage } from '../../services/core-storage/core-storage';
import { EnumStorage } from '../../models/storage.model';

export const notLoggedInGuard: CanActivateFn = (route, state) => {
  const _storage$ = inject(CoreStorage);
  const _router$ = inject(Router);

  const tokenLogin = _storage$.getItem(EnumStorage.TOKEN);
  if (!tokenLogin) return true;
  return _router$.navigateByUrl('/');
};
