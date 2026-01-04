import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ValidatorFn } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

import { Floating } from '../../ui/floating/floating';
import { RegisterModel } from '../../models/register.model';
import { AppModule } from '../../../../app.module';
import { REGEX } from '../../../../shared/constants/regex';
import { ValidatorReactive } from '../../../../shared/utils/validator-reactive';
import { Label } from '../../../../shared/components/label/label';

const VALIDATOR = [
  ValidatorReactive.required(),
  ValidatorReactive.pattern(REGEX.LETTER_NUMBER_SPACE),
  ValidatorReactive.minLength(2),
  ValidatorReactive.maxLength(50),
];

@Component({
  selector: 'app-register',
  imports: [AppModule, Floating, CardModule, DividerModule, ButtonModule, InputTextModule, DatePickerModule, InputMaskModule, PasswordModule, Label],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register implements OnInit {
  private readonly _fb$ = inject(FormBuilder);

  protected readonly _mediumPassword$ = signal<string>(this.stringRegex(REGEX.MEDIUM_PASSWORD)).asReadonly();
  protected readonly _strongPassword$ = signal<string>(this.stringRegex(REGEX.STRONG_PASSWORD)).asReadonly();

  protected readonly cardFullScreen = signal(false);
  protected readonly _formRegister$ = this._fb$.group<RegisterModel>(
    {
      names: this._fb$.nonNullable.control('', [...VALIDATOR]),
      surnames: this._fb$.nonNullable.control('', [...VALIDATOR]),
      birthday: this._fb$.nonNullable.control(undefined as unknown as Date, ValidatorReactive.required()),
      phone: this._fb$.nonNullable.control('', ValidatorReactive.required()),
      email: this._fb$.nonNullable.control('', [ValidatorReactive.required(), ValidatorReactive.email()]),
      password: this._fb$.nonNullable.control('', [ValidatorReactive.required(), ValidatorReactive.minLength(8)]),
      passwordConfirm: this._fb$.nonNullable.control(''),
    },
    {
      validators: this.validatePassword(),
    },
  );

  constructor() {}

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
    if (this._formRegister$.invalid) return;

    console.log(this._formRegister$.value);
  }

  private validatePassword(): ValidatorFn {
    return (control) => {
      const password = control.get('password')?.value;
      const passwordConfirm = control.get('passwordConfirm')?.value;

      if (password !== passwordConfirm) {
        control.get('passwordConfirm')?.setErrors({ passwordNotMatch: 'Las contraseña no coinciden' });
      } else {
        if (control.get('passwordConfirm')?.hasError('passwordNotMatch')) control.get('passwordConfirm')?.setErrors(null);
      }
      return null;
    };
  }

  private stringRegex(regex: RegExp): string {
    return String(regex).replace(/^\/|\/$/g, '');
  }
}
