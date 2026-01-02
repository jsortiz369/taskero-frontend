import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink, CommonModule, ButtonModule, DrawerModule],
  templateUrl: './topbar.html',
})
export class Topbar implements OnInit, OnDestroy {
  protected readonly _layoutService$ = inject(LayoutService);

  constructor() {}

  ngOnInit(): void {
    this.onResize();
  }

  ngOnDestroy(): void {
    this._layoutService$.toggleMenu();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this._layoutService$.onResize(event);
  }
}
