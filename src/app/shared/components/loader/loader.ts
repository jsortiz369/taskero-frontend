import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader {
  protected readonly _loaderService$ = inject(LoaderService);
}
