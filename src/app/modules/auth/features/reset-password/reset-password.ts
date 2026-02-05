import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';

import { AppModule } from '../../../../app.module';
import { REGEX } from '../../../../shared/constants/regex';

@Component({
  selector: 'app-reset-password',
  imports: [AppModule, IconFieldModule, InputIconModule, DividerModule, PasswordModule, ButtonModule],
  templateUrl: './reset-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPassword {
  protected readonly _mediumPassword$ = signal<string>(this.stringRegex(REGEX.INPUT_PASSWORD_MEDIUM)).asReadonly();
  protected readonly _strongPassword$ = signal<string>(this.stringRegex(REGEX.INPUT_PASSWORD_STRONG)).asReadonly();

  constructor() {
    console.log('reset-password');
  }

  private stringRegex(regex: RegExp): string {
    return String(regex).replace(/^\/|\/$/g, '');
  }
}
