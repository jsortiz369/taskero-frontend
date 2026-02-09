import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderCustom {
  /* private readonly _visible$ = signal<boolean>(false);
  private readonly _loadingChangeView$ = signal<boolean>(false);

  constructor() {}

  set visible(isVisible: boolean) {
    this._visible$.set(isVisible);
  }

  get getVisible(): boolean {
    return this._visible$();
  }

  set visibleChangeView(isVisible: boolean) {
    this._loadingChangeView$.set(isVisible);
  }

  get getVisibleChangeView(): boolean {
    return this._loadingChangeView$();
  } */

  private readonly loader$ = new BehaviorSubject<boolean>(false);
  private readonly loaderChangeView$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  set loader(isVisible: boolean) {
    this.loader$.next(isVisible);
  }

  get loader(): Observable<boolean> {
    return this.loader$.asObservable();
  }

  set loaderChangeView(isVisible: boolean) {
    this.loaderChangeView$.next(isVisible);
  }

  get loaderChangeView(): Observable<boolean> {
    return this.loaderChangeView$.asObservable();
  }
}
