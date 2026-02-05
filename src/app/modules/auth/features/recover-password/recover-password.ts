import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { AppModule } from '../../../../app.module';

@Component({
  selector: 'app-recover-password',
  imports: [AppModule, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './recover-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverPassword {}
