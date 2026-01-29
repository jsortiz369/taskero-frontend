import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { InputTextModule } from 'primeng/inputtext';

import { AppModule } from '../../../../app.module';
import { Auth } from '../../services';
import { CoreStorage } from '../../../../core/services/core-storage/core-storage';
import { ConfirmModel } from '../../models/confirm';
import { ValidatorReactive } from '../../../../shared/utils/validator-reactive';
import { Toast } from '../../../../shared/services/toast';

@Component({
  selector: 'app-confirm-account',
  imports: [AppModule, InputTextModule, InputOtpModule, ButtonModule],
  templateUrl: './confirm-account.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmAccount implements OnInit, OnDestroy {
  private readonly _fb$ = inject(FormBuilder);
  private readonly _toast$ = inject(Toast);
  private readonly _auth$ = inject(Auth);
  private readonly _storage$ = inject(CoreStorage);
  private readonly _router$ = inject(Router);

  private idInterval: any;

  readonly _disabledResendCode$ = signal<boolean>(true);
  readonly _loadingConfirm$ = signal<boolean>(false);
  readonly _minutes$ = signal<number>(1);
  readonly _seconds$ = signal<number>(59);

  protected readonly _formConfirm$ = this._fb$.group<ConfirmModel>({
    otp: this._fb$.nonNullable.control('', ValidatorReactive.required()),
  });

  constructor() {
    console.log('confirm account');
  }

  ngOnInit(): void {
    this.initIntervalResendCode();
  }

  ngOnDestroy(): void {
    if (this.idInterval) clearInterval(this.idInterval);
  }

  comfirmAccount() {
    if (!this._formConfirm$.valid) return;
    const data = this._formConfirm$.getRawValue();

    console.log('data confirm', data);
  }

  private initIntervalResendCode() {
    this._minutes$.set(1);
    this._seconds$.set(59);
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
