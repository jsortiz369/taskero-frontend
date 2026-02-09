import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LoaderCustom } from '../../services/loader-custom';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrl: './loader.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader {
  private readonly _loaderCustom$ = inject(LoaderCustom);

  readonly loader$ = signal<boolean>(false);
  readonly loaderChangeView$ = signal<boolean>(false);

  constructor() {
    this._loaderCustom$.loaderChangeView.subscribe((value) => {
      this.loaderChangeView$.set(value);
      document.body.style.overflow = value ? 'hidden' : 'auto';
    });

    this._loaderCustom$.loader.subscribe((value) => {
      this.loader$.set(value);
      document.body.style.overflow = value ? 'hidden' : 'auto';
    });
  }
}
