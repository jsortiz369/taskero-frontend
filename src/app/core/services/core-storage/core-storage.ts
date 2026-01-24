import { Injectable } from '@angular/core';
import { EnumStorage } from '../../models/storage.model';

@Injectable({
  providedIn: 'root',
})
export class CoreStorage {
  private readonly _token$ = window.localStorage;

  constructor() {}

  setItem(key: EnumStorage, value: unknown): void {
    let data = JSON.stringify({ value });
    this._token$.setItem(key, data);
  }

  getItem<T extends string>(key: EnumStorage): T | null {
    const data = this._token$.getItem(key);
    if (data !== null) {
      try {
        const storageValue = JSON.parse(data) as { value: T };
        return storageValue.value;
      } catch (error) {
        return null;
      }
    }

    return null;
  }

  removeItem(key: EnumStorage): void {
    this._token$.removeItem(key);
  }

  clear(): void {
    this._token$.clear();
  }
}
