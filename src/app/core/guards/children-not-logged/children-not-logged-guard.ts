import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

import { LoaderCustom } from '../../../shared/services/loader-custom';
import { CoreStorage } from '../../services/core-storage/core-storage';
import { EnumStorage } from '../../models/storage.model';
import { LoggedInUser } from '../../services/logged-in-user/logged-in-user';
import { delay, finalize, of } from 'rxjs';

export const childrenNotLoggedGuard: CanActivateChildFn = (childRoute, state) => {
  const _router$ = inject(Router);
  const _storage$ = inject(CoreStorage);
  const _loaderCustom$ = inject(LoaderCustom);

  const tokenConfirm = _storage$.getItem(EnumStorage.CONFIRM_ACCOUNT);
  if (state.url.includes('/auth/confirm-account')) {
    const _loggedInUser$ = inject(LoggedInUser);
    const loggedIn = _loggedInUser$.isValidJwtToken(EnumStorage.CONFIRM_ACCOUNT);
    if (!tokenConfirm || !loggedIn) return _router$.navigateByUrl('/auth/login');
  }

  if (!state.url.includes('/auth/confirm-account') && tokenConfirm) return _router$.navigateByUrl('/auth/confirm-account');

  if (state.url.includes('/auth/confirm-account')) {
  }

  _loaderCustom$.loaderChangeView = true;
  return of(true).pipe(
    delay(500),
    finalize(() => (_loaderCustom$.loaderChangeView = false)),
  );
};
