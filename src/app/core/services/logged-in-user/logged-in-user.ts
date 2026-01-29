import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

import { EnumStorage } from '../../models/storage.model';
import { CoreStorage } from '../core-storage/core-storage';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUser {
  private readonly _storage$ = inject(CoreStorage);

  isValidJwtToken(key: EnumStorage): false | string {
    const token = this._storage$.getItem(key);
    if (!token) return false;

    try {
      const result = jwtDecode<{ exp?: number; iat?: number }>(token);
      const isExpired = !result.exp || result.exp <= Math.floor(Date.now() / 1000);
      if (isExpired) {
        this._storage$.removeItem(key);
        return false;
      }
      return token;
    } catch (error) {
      return false;
    }
  }
}
