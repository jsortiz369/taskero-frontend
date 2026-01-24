import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';

import { AppModule } from '../../../../app.module';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-confirm-account',
  imports: [AppModule, InputTextModule, InputOtpModule, ButtonModule],
  templateUrl: './confirm-account.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmAccount {
  constructor() {
    console.log('confirm account');
  }
}
