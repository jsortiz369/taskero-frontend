import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { finalize } from 'rxjs';
import { ZodError } from 'zod';

import { AppModule } from '../../../../app.module';
import { AlertsCustom } from '../../../../shared/services/alerts-custom';
import { Auth } from '../../services';
import { RecoverPasswordModel, ResponseRecoverPassword } from '../../models/recover-password';
import { ValidatorReactive } from '../../../../shared/utils/validator-reactive';
import { HttpErrors } from '../../../../shared/models/http-erros';

@Component({
  selector: 'app-recover-password',
  imports: [AppModule, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './recover-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverPassword {
  private readonly _fb$ = inject(FormBuilder);
  private readonly _alertsCustom$ = inject(AlertsCustom);
  private readonly _auth$ = inject(Auth);
  private readonly _router$ = inject(Router);

  readonly _loadingRecover$ = signal<boolean>(false);

  protected readonly _formRecover$ = this._fb$.group<RecoverPasswordModel>({
    username: this._fb$.nonNullable.control('', [ValidatorReactive.required(), ValidatorReactive.minLength(5)]),
  });

  constructor() {}

  onSubmit() {
    if (!this._formRecover$.valid) return;
    const { username } = this._formRecover$.getRawValue();

    this._loadingRecover$.set(true);
    this._auth$
      .recoverPassword(username)
      .pipe(finalize(() => this._loadingRecover$.set(false)))
      .subscribe({
        next: (data: ResponseRecoverPassword) => {
          const message = data.success;
          this._alertsCustom$.toast({ severity: 'success', summary: 'Exito', detail: message });
          this._router$.navigateByUrl('/auth/login');
        },
        error: (error: HttpErrorResponse | ZodError) => {
          if (!(error instanceof HttpErrorResponse)) {
            error.issues.forEach((issue) => console.log(issue.message));
            return;
          }

          const errors = error.error as HttpErrors;
          const message = errors.error.message;
          const detail = Array.isArray(message) ? message.join('\n') : message;

          this._alertsCustom$.toast({
            severity: 'error',
            summary: 'Error',
            detail: detail || 'No se puedo enviar la solicitud de restablecimiento de contraseña. Por favor, reinténtelo de nuevo.',
          });
        },
      });
  }
}
