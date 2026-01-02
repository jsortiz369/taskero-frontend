import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { LayoutService } from '../../../../layout/services/layout.service';

@Component({
  selector: 'app-floating',
  imports: [CommonModule, ButtonModule],
  templateUrl: './floating.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Floating {
  protected readonly _layoutService$ = inject(LayoutService);
}
