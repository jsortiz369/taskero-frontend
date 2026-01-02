import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly _visible$ = signal<boolean>(false);

  constructor() {}

  set visible(isVisible: boolean) {
    this._visible$.set(isVisible);
  }

  get getVisible(): boolean {
    return this._visible$();
  }
}
