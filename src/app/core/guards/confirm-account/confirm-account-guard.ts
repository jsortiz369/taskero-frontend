import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { delay, finalize, of } from 'rxjs';

import { LoaderService } from '../../../shared/services/loader.service';
import { CoreStorage } from '../../services/core-storage/core-storage';
import { EnumStorage } from '../../models/storage.model';
import { LoggedInUser } from '../../services/logged-in-user/logged-in-user';

export const confirmAccountGuard: CanActivateFn = (route, state) => {
  const _router$ = inject(Router);
  const _storage$ = inject(CoreStorage);
  const _loader$ = inject(LoaderService);

  const tokenConfirm = _storage$.getItem(EnumStorage.CONFIRM_ACCOUNT);
  if (state.url === '/auth/confirm-account' && !tokenConfirm) return _router$.navigateByUrl('/auth/login');
  if (state.url !== '/auth/confirm-account' && tokenConfirm) return _router$.navigateByUrl('/auth/confirm-account');
  if (state.url === '/auth/confirm-account' && tokenConfirm) {
    const _loggedInUser$ = inject(LoggedInUser);
    if (_loggedInUser$.isValidJwtToken(EnumStorage.CONFIRM_ACCOUNT) === false) return _router$.navigateByUrl('/auth/login');
  }

  _loader$.visible = true;
  return of(true).pipe(
    delay(500),
    finalize(() => (_loader$.visible = false)),
  );
};
