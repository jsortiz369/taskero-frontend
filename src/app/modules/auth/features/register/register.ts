import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ZodError } from 'zod';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { KeyFilterModule } from 'primeng/keyfilter';

import { Floating } from '../../ui/floating/floating';
import { RegisterModel } from '../../models/register';
import { AppModule } from '../../../../app.module';
import { REGEX } from '../../../../shared/constants/regex';
import { ValidatorReactive } from '../../../../shared/utils/validator-reactive';
import { Label } from '../../../../shared/components/label/label';
import { existEmail, existPhone, existUsername, matchPassword } from '../../utils/register-validators';
import { Auth } from '../../services';
import { Toast } from '../../../../shared/services/toast';
import { HttepErrors } from '../../../../shared/models/http-erros';
import { PrimeNG } from 'primeng/config';
import { updatePreset, updateSurfacePalette } from '@primeuix/themes';

const VALIDATOR = [
  ValidatorReactive.required(),
  ValidatorReactive.pattern(REGEX.INPUT_TEXT),
  ValidatorReactive.minLength(2),
  ValidatorReactive.maxLength(50),
];

@Component({
  selector: 'app-register',
  imports: [
    AppModule,
    Floating,
    CardModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    DatePickerModule,
    InputMaskModule,
    PasswordModule,
    KeyFilterModule,
    Label,
  ],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register implements OnInit {
  private readonly _fb$ = inject(FormBuilder);
  private readonly _auth$ = inject(Auth);
  private readonly _toast$ = inject(Toast);

  protected readonly _mediumPassword$ = signal<string>(this.stringRegex(REGEX.INPUT_PASSWORD_MEDIUM)).asReadonly();
  protected readonly _strongPassword$ = signal<string>(this.stringRegex(REGEX.INPUT_PASSWORD_STRONG)).asReadonly();
  protected readonly _textRegex$ = signal<RegExp>(REGEX.INPUT_TEXT).asReadonly();
  protected readonly _usernameRegex$ = signal<RegExp>(REGEX.INPUT_USERNAME).asReadonly();
  protected readonly _loaddingRegister$ = signal<boolean>(false);

  protected readonly cardFullScreen = signal(false);
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
      phone: this._fb$.nonNullable.control('', ValidatorReactive.required(), existPhone(this._auth$)),
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

  readonly progress = signal(0);

  constructor(private readonly servicePrimenNG: PrimeNG) {}

  get controls$() {
    return this._formRegister$.controls;
  }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    const width = event?.target?.innerWidth ?? window.innerWidth;
    this.cardFullScreen.set(width < 480 ? true : false);
  }

  protected register() {
    if (!this._formRegister$.valid) return;

    const { passwordConfirm, ...register } = this._formRegister$.getRawValue();
    register.phone = register.phone.replace(/[^0-9]+/g, '');
    this._loaddingRegister$.set(true);
    this._auth$
      .register(register)
      .pipe(finalize(() => this._loaddingRegister$.set(false)))
      .subscribe({
        next: (data) => {
          this._toast$.toast({ severity: 'success', summary: 'Exito', detail: 'Registro exitoso' });
          this._formRegister$.reset();
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
