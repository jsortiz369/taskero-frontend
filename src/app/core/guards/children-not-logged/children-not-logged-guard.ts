import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

import { LoaderService } from '../../../shared/services/loader.service';
import { CoreStorage } from '../../services/core-storage/core-storage';
import { EnumStorage } from '../../models/storage.model';
import { LoggedInUser } from '../../services/logged-in-user/logged-in-user';
import { delay, finalize, of } from 'rxjs';

export const childrenNotLoggedGuard: CanActivateChildFn = (childRoute, state) => {
  const _router$ = inject(Router);
  const _storage$ = inject(CoreStorage);
  const _loader$ = inject(LoaderService);

  const tokenConfirm = _storage$.getItem(EnumStorage.CONFIRM_ACCOUNT);
  if (state.url.includes('/auth/confirm-account')) {
    const _loggedInUser$ = inject(LoggedInUser);
    const loggedIn = _loggedInUser$.isValidJwtToken(EnumStorage.CONFIRM_ACCOUNT);
    if (!tokenConfirm || !loggedIn) return _router$.navigateByUrl('/auth/login');
  }

  if (!state.url.includes('/auth/confirm-account') && tokenConfirm) return _router$.navigateByUrl('/auth/confirm-account');

  if (state.url.includes('/auth/confirm-account')) {
  }

  _loader$.visible = true;
  return of(true).pipe(
    delay(500),
    finalize(() => (_loader$.visible = false)),
  );
};
