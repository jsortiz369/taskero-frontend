import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { keyof, ZodError } from 'zod';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

import { AppModule } from '../../../../app.module';
import { Auth } from '../../services';
import { Toast } from '../../../../shared/services/toast';
import { ValidatorReactive } from '../../../../shared/utils/validator-reactive';
import { HttepErrors } from '../../../../shared/models/http-erros';
import { ControlMessageError } from '../../../../shared/components/control-message-error/control-message-error';
import { CoreStorage } from '../../../../core/services/core-storage/core-storage';
import { EnumStorage } from '../../../../core/models/storage.model';
import { LoginModel, ResponseLogin } from '../../models/login';

@Component({
  selector: 'app-login',
  imports: [AppModule, PasswordModule, ButtonModule, ControlMessageError],
  templateUrl: './login.html',
})
export class Login {
  private readonly _fb$ = inject(FormBuilder);
  private readonly _toast$ = inject(Toast);
  private readonly _auth$ = inject(Auth);
  private readonly _storage$ = inject(CoreStorage);
  private readonly _router$ = inject(Router);

  readonly _loadingLogin$ = signal<boolean>(false);
  readonly _disabledLogin$ = signal<boolean>(false);
  readonly _messageError$ = signal<string>('');

  protected readonly _formLogin$ = this._fb$.group<LoginModel>({
    username: this._fb$.nonNullable.control('', ValidatorReactive.required()),
    password: this._fb$.nonNullable.control('', ValidatorReactive.required()),
  });

  login() {
    if (!this._formLogin$.valid) return;

    const data = this._formLogin$.getRawValue();
    this._loadingLogin$.set(true);
    this._auth$
      .login(data)
      .pipe(finalize(() => this._loadingLogin$.set(false)))
      .subscribe({
        next: (data: ResponseLogin) => {
          if ('tokenConfirm' in data) {
            this._storage$.setItem(EnumStorage.CONFIRM_ACCOUNT, data.tokenConfirm);
            this._router$.navigateByUrl('/auth/confirm-account');
            return;
          }

          console.log('la cuenta ya esta confirmada', data);
          /* this._toast$.toast({ severity: 'success', summary: 'Exito', detail: 'Login exitoso' });

          this._storage$.setItem(EnumStorage.TOKEN, data.token);
          this._storage$.setItem(EnumStorage.REFRESH_TOKEN, data.tokenRefresh);

          this._router$.navigateByUrl('/'); */
        },
        error: (error: HttpErrorResponse | ZodError) => {
          if (!(error instanceof HttpErrorResponse)) {
            error.issues.forEach((issue) => console.log(issue.message));
            return;
          }

          const errors = error.error as HttepErrors;
          if (error.status === 400) {
            const message = errors.error.message;
            const detail = Array.isArray(message) ? message.join('\n') : message;
            this._toast$.toast({ severity: 'error', summary: 'Error', detail: detail });
          } else if (error.status === 423) {
            this._toast$.toast({ severity: 'warn', summary: 'Advertencia', detail: String(errors.error.message) });
          } else if (error.status === 401) {
            this._disabledLogin$.set(true);
            this._messageError$.set(String(errors.error.message));
            setTimeout(() => {
              this._messageError$.set('');
              this._disabledLogin$.set(false);
            }, 2000);
          }
        },
      });
  }
}
