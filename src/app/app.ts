import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Toast } from './shared/components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  template: `
    <app-toast />
    <router-outlet />
  `,
})
export class App {}
