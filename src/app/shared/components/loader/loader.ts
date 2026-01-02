import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader {
  protected readonly _loaderService$ = inject(LoaderService);
}
