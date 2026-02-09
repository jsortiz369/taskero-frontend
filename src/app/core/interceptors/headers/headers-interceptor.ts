import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

import { CoreStorage } from '../../services/core-storage/core-storage';
import { EnumStorage } from '../../models/storage.model';
import { LoggedInUser } from '../../services/logged-in-user/logged-in-user';
import { AlertsCustom } from '../../../shared/services/alerts-custom';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;

  // TODO: is endpoint auth
  if (url.includes('/auth/')) return authInterceptor(req, next);

  // TODO: add header timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const cloneReq = req.clone({ setHeaders: { Timezone: timeZone } });

  const _storage$ = inject(CoreStorage);
  return next(cloneReq);
};

const authInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;

  // TODO: is not confirm account endpoint
  if (['auth/confirm', 'auth/resend-confirmation-token'].includes(url)) return next(req);
  //if (url !== `${baseUrl}/auth/confirm` && url !== `${baseUrl}/auth/resend-confirmation-token`) return next(req);

  const _loggedInUser$ = inject(LoggedInUser);
  const tokenConfirm = _loggedInUser$.isValidJwtToken(EnumStorage.CONFIRM_ACCOUNT);

  // valid token confirm account
  if (tokenConfirm == false) {
    const _router$ = inject(Router);
    const _alertsCustom$ = inject(AlertsCustom);
    _alertsCustom$.toast({ severity: 'warn', summary: 'Advertencia', detail: 'Se ha expirado la confirmación' });
    _router$.navigateByUrl('/auth');
    return EMPTY;
  }

  const headers = req.headers.set('Authorization', `Bearer ${tokenConfirm}`);
  req = req.clone({ headers });
  return next(req);
};
