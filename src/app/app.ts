import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterModule, ButtonModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('app');
}
