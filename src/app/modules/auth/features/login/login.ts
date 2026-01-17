import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

import { AppModule } from '../../../../app.module';
import { Auth } from '../../services';
import { Toast } from '../../../../shared/services/toast';

@Component({
  selector: 'app-login',
  imports: [AppModule, PasswordModule, ButtonModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly _fb$ = inject(FormBuilder);
  private readonly _auth$ = inject(Auth);
  private readonly _toast$ = inject(Toast);

  protected readonly _formLogin$ = this._fb$.group({});

  login() {
    this._toast$.toast({
      severity: 'info',
      summary: 'Exito',
      detail: 'Login exitoso',
      sticky: false,
    });

    this._toast$.toast({
      severity: 'success',
      summary: 'Exito',
      detail: 'Login exitoso',
      sticky: false,
    });

    this._toast$.toast({
      severity: 'warn',
      summary: 'Exito',
      detail: 'Login exitoso',
      sticky: false,
    });

    this._toast$.toast({
      severity: 'error',
      summary: 'Exito',
      detail: 'Login exitoso',
      sticky: false,
    });

    this._toast$.toast({
      severity: 'secondary',
      summary: 'Exito',
      detail: 'Login exitoso',
      sticky: false,
    });

    this._toast$.toast({
      severity: 'contrast',
      summary: 'Exito',
      detail: 'Login exitoso',
      sticky: false,
    });
  }
}
