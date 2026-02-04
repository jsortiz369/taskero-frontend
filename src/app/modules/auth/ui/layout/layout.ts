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
  constructor() {
    //const base = '#2866eb'; // blue 500
    //const base = '#ff00ff'; // fuchsia 500
    const base = '#1e1e1e'; // neutral 500

    const palette = {
      50: this.mix(base, '#ffffff', 0.9),
      100: this.mix(base, '#ffffff', 0.75),
      200: this.mix(base, '#ffffff', 0.6),
      300: this.mix(base, '#ffffff', 0.45),
      400: this.mix(base, '#ffffff', 0.25),
      500: base,
      600: this.mix(base, '#000000', 0.15),
      700: this.mix(base, '#000000', 0.3),
      800: this.mix(base, '#000000', 0.45),
      900: this.mix(base, '#000000', 0.6),
      950: this.mix(base, '#000000', 0.75),
    };

    console.log('palette', palette);
  }

  mix(hex1: string, hex2: string, weight: number): string {
    const hex = (hex: any) =>
      hex
        .replace('#', '')
        .match(/.{2}/g)
        .map((x: any) => parseInt(x, 16));

    const [r1, g1, b1] = hex(hex1);
    const [r2, g2, b2] = hex(hex2);

    const r = Math.round(r1 * (1 - weight) + r2 * weight);
    const g = Math.round(g1 * (1 - weight) + g2 * weight);
    const b = Math.round(b1 * (1 - weight) + b2 * weight);

    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
  }

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
