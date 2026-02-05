import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ZodError } from 'zod';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { KeyFilterModule } from 'primeng/keyfilter';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { RegisterModel } from '../../models/register';
import { AppModule } from '../../../../app.module';
import { REGEX } from '../../../../shared/constants/regex';
import { ValidatorReactive } from '../../../../shared/utils/validator-reactive';
import { existEmail, existPhone, existUsername, matchPassword } from '../../utils/register-validators';
import { Auth } from '../../services';
import { Toast } from '../../../../shared/services/toast';
import { HttepErrors } from '../../../../shared/models/http-erros';
import { capitalizeAllWords } from '../../../../shared/utils/capitalize';
import { CoreStorage } from '../../../../core/services/core-storage/core-storage';
import { EnumStorage } from '../../../../core/models/storage.model';

const VALIDATOR = [
  ValidatorReactive.required(),
  ValidatorReactive.pattern(REGEX.INPUT_TEXT),
  ValidatorReactive.minLength(2),
  ValidatorReactive.maxLength(50),
];

@Component({
  selector: 'app-register',
  imports: [AppModule, IconFieldModule, InputIconModule, DividerModule, ButtonModule, InputMaskModule, PasswordModule, KeyFilterModule],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register implements OnInit {
  private readonly _fb$ = inject(FormBuilder);
  private readonly _router$ = inject(Router);
  private readonly _toast$ = inject(Toast);
  private readonly _auth$ = inject(Auth);
  private readonly _storage$ = inject(CoreStorage);

  protected readonly _mediumPassword$ = signal<string>(this.stringRegex(REGEX.INPUT_PASSWORD_MEDIUM)).asReadonly();
  protected readonly _strongPassword$ = signal<string>(this.stringRegex(REGEX.INPUT_PASSWORD_STRONG)).asReadonly();
  protected readonly _textRegex$ = signal<RegExp>(REGEX.INPUT_TEXT).asReadonly();
  protected readonly _usernameRegex$ = signal<RegExp>(REGEX.INPUT_USERNAME).asReadonly();
  protected readonly _loadingRegister$ = signal<boolean>(false);

  protected readonly _formRegister$ = this._fb$.group<RegisterModel>(
    {
      names: this._fb$.nonNullable.control('', [...VALIDATOR]),
      surnames: this._fb$.nonNullable.control('', [...VALIDATOR]),
      username: this._fb$.nonNullable.control(
        '',
        [
          ValidatorReactive.required(),
          ValidatorReactive.minLength(5),
          ValidatorReactive.pattern(REGEX.INPUT_USERNAME, 'No cumple para nombre de usuario'),
          ValidatorReactive.maxLength(20),
        ],
        [existUsername(this._auth$)],
      ),
      phone: this._fb$.nonNullable.control('', {
        validators: [ValidatorReactive.required(), ValidatorReactive.pattern(/^\(\+57\) \d{3}-\d{4}-\d{3}$/, 'Teléfono no valido')],
        asyncValidators: existPhone(this._auth$),
      }),
      email: this._fb$.nonNullable.control(
        '',
        [ValidatorReactive.required(), ValidatorReactive.minLength(5), ValidatorReactive.email(), ValidatorReactive.maxLength(100)],
        [existEmail(this._auth$)],
      ),
      password: this._fb$.nonNullable.control('', [
        ValidatorReactive.required(),
        ValidatorReactive.pattern(REGEX.INPUT_PASSWORD_MEDIUM, 'La contraseña no cumple con al menos una contraseña media.'),
      ]),
      passwordConfirm: this._fb$.nonNullable.control('', ValidatorReactive.required()),
    },
    {
      validators: matchPassword(),
    },
  );

  constructor() {}

  get controls$() {
    return this._formRegister$.controls;
  }

  ngOnInit(): void {}

  protected register() {
    if (!this._formRegister$.valid) return;

    const { passwordConfirm, ...register } = this._formRegister$.getRawValue();
    register.phone = register.phone.replace(/[^0-9]+/g, '');
    register.names = capitalizeAllWords(register.names);
    register.surnames = capitalizeAllWords(register.surnames);
    this._loadingRegister$.set(true);
    this._auth$
      .register(register)
      .pipe(finalize(() => this._loadingRegister$.set(false)))
      .subscribe({
        next: (data) => {
          this._toast$.toast({ severity: 'success', summary: 'Exito', detail: 'Registro exitoso' });
          this._formRegister$.reset();

          this._storage$.setItem(EnumStorage.CONFIRM_ACCOUNT, data.tokenConfirm);
          this._router$.navigateByUrl('/auth/confirm-account');
          return;
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
          } else if (error.status === 409) {
            const message = String(errors.error.message);
            this._toast$.toast({ severity: 'warn', summary: 'Error', detail: message });
          }
        },
      });
  }

  private stringRegex(regex: RegExp): string {
    return String(regex).replace(/^\/|\/$/g, '');
  }
}
