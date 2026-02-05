import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';

import { AppModule } from '../../../../app.module';

@Component({
  selector: 'app-password-recovery',
  imports: [AppModule, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './password-recovery.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordRecovery {}
