import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { LayoutService } from '../../../../layout/services/layout.service';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, CardModule, ButtonModule],
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout implements OnInit {
  protected readonly _layoutService$ = inject(LayoutService);

  protected readonly _detailInfo$ = signal(false);
  protected readonly _cardInfo$ = signal(false);
  protected readonly _cardInfoFullScreen$ = signal(false);

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    const width = event?.target?.innerWidth ?? window.innerWidth;
    if (width >= 1024) {
      this._cardInfo$.set(false);
      this._detailInfo$.set(true);
    } else {
      this._cardInfo$.set(true);
      this._detailInfo$.set(false);
      if (width < 480) this._cardInfoFullScreen$.set(true);
      else this._cardInfoFullScreen$.set(false);
    }
  }
}
