import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { InputTextModule } from 'primeng/inputtext';
import { finalize } from 'rxjs';
import { ZodError } from 'zod';

import { AppModule } from '../../../../app.module';
import { Auth } from '../../services';
import { CoreStorage } from '../../../../core/services/core-storage/core-storage';
import { ConfirmModel, ResponseConfirm, ResponseResend } from '../../models/confirm';
import { ValidatorReactive } from '../../../../shared/utils/validator-reactive';
import { AlertsCustom } from '../../../../shared/services/alerts-custom';
import { EnumStorage } from '../../../../core/models/storage.model';
import { HttpErrors } from '../../../../shared/models/http-erros';

@Component({
  selector: 'app-confirm-account',
  imports: [AppModule, InputTextModule, InputOtpModule, ButtonModule],
  templateUrl: './confirm-account.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmAccount implements OnInit, OnDestroy {
  private readonly _fb$ = inject(FormBuilder);
  private readonly _alertsCustom$ = inject(AlertsCustom);
  private readonly _auth$ = inject(Auth);
  private readonly _storage$ = inject(CoreStorage);
  private readonly _router$ = inject(Router);

  private idInterval: any;

  readonly _disabledResendCode$ = signal<boolean>(true);
  readonly _disabledConfirm$ = signal<boolean>(false);
  readonly _loadingConfirm$ = signal<boolean>(false);
  readonly _minutes$ = signal<number>(1);
  readonly _seconds$ = signal<number>(0);

  protected readonly _formConfirm$ = this._fb$.group<ConfirmModel>({
    otp: this._fb$.nonNullable.control('', [ValidatorReactive.required(), ValidatorReactive.minLength(6)]),
  });

  constructor() {}

  ngOnInit(): void {
    this.initIntervalResendCode();
  }

  ngOnDestroy(): void {
    if (this.idInterval) clearInterval(this.idInterval);
  }

  onResendCode() {
    if (this._disabledResendCode$()) return;

    // reenviar codigo
    this._disabledConfirm$.set(true);
    this._auth$
      .resendConfirmationToken()
      .pipe(finalize(() => this._disabledConfirm$.set(false)))
      .subscribe({
        next: (data: ResponseResend) => {
          this._alertsCustom$.toast({ severity: 'success', summary: 'Éxito', detail: 'El código ha sido reenviado a su correo electrónico.' });
          this.initIntervalResendCode();
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
            detail: detail || 'No se pudo reenviar el código. Por favor, inténtelo de nuevo.',
          });
        },
      });
  }

  onSubmit() {
    if (!this._formConfirm$.valid) return;
    const { otp } = this._formConfirm$.getRawValue();

    this._loadingConfirm$.set(true);
    this._auth$
      .confirmAccount(otp)
      .pipe(finalize(() => this._loadingConfirm$.set(false)))
      .subscribe({
        next: (data: ResponseConfirm) => {
          this._alertsCustom$.toast({ severity: 'success', summary: 'Success', detail: 'La cuenta ha sido confirmada.' });
          this._storage$.removeItem(EnumStorage.CONFIRM_ACCOUNT);
          this._storage$.setItem(EnumStorage.TOKEN, data.token);
          this._storage$.setItem(EnumStorage.REFRESH_TOKEN, data.tokenRefresh);
          this._router$.navigateByUrl('/');
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
            detail: detail || 'No se pudo confirmar la cuenta. Por favor, inténtelo de nuevo.',
          });
        },
      });
  }

  private initIntervalResendCode() {
    this._minutes$.set(1);
    this._seconds$.set(0);
    this._disabledResendCode$.set(true);
    this.idInterval = setInterval(() => {
      if (this._seconds$() > 0) return this._seconds$.update((sec) => sec - 1);
      if (this._minutes$() <= 0) return this.closeIntervalResendCode();

      this._minutes$.update((min) => min - 1);
      this._seconds$.set(59);
    }, 1000);
  }

  private closeIntervalResendCode() {
    if (this.idInterval) clearInterval(this.idInterval);
    this._minutes$.set(0);
    this._seconds$.set(0);
    this._disabledResendCode$.set(false);
  }
}
