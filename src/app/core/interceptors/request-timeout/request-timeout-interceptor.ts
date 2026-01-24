import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { delay, dematerialize, materialize } from 'rxjs';

export const requestTimeoutInterceptor: HttpInterceptorFn = (req, next) => {
  const timeout = environment.requestTimeout;
  if (!timeout) return next(req);

  return next(req).pipe(materialize(), delay(timeout), dematerialize());
};
