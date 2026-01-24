import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Toast } from './shared/components/toast/toast';
import { Loader } from './shared/components/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Loader],
  template: `
    <app-loader />
    <app-toast />
    <router-outlet />
  `,
})
export class App {}
