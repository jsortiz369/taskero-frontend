import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ValidatorFn } from '@angular/forms';
import { finalize } from 'rxjs';
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
import { existEmail, existPhone } from '../../utils/register-validators';
import { Auth } from '../../services';
import { Toast } from '../../../../shared/services/toast';

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
  private readonly _auth$ = inject(Auth);
  private readonly _toast$ = inject(Toast);

  protected readonly _mediumPassword$ = signal<string>(this.stringRegex(REGEX.MEDIUM_PASSWORD)).asReadonly();
  protected readonly _strongPassword$ = signal<string>(this.stringRegex(REGEX.STRONG_PASSWORD)).asReadonly();
  protected readonly _loaddingRegister$ = signal<boolean>(false);

  protected readonly cardFullScreen = signal(false);
  protected readonly _formRegister$ = this._fb$.group<RegisterModel>(
    {
      names: this._fb$.nonNullable.control('', [...VALIDATOR]),
      surnames: this._fb$.nonNullable.control('', [...VALIDATOR]),
      birthday: this._fb$.nonNullable.control(undefined as unknown as Date, ValidatorReactive.required()),
      phone: this._fb$.nonNullable.control('', ValidatorReactive.required(), existPhone(this._auth$)),
      email: this._fb$.nonNullable.control(
        '',
        [ValidatorReactive.required(), ValidatorReactive.minLength(5), ValidatorReactive.email(), ValidatorReactive.maxLength(100)],
        [existEmail(this._auth$)],
      ),
      password: this._fb$.nonNullable.control('', [
        ValidatorReactive.required(),
        ValidatorReactive.pattern(REGEX.MEDIUM_PASSWORD, 'La contraseña no cumple con al menos una contraseña media.'),
      ]),
      passwordConfirm: this._fb$.nonNullable.control(''),
    },
    {
      validators: this.validatePassword(),
    },
  );

  readonly progress = signal(0);

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
    try {
      this._loaddingRegister$.set(true);

      this._toast$.toast({
        severity: 'secondary',
        icon: 'pi-check-circle',
        detail:
          'Message Content dsfsdfsdfsdfs assd sad sad dsdasdasdasdsa sadasd sd sadasd as  sdasdas ad asdas dasd as da ad sadsa dsa asdasdas asd asad',
        life: 3000,
        sticky: true,
      });

      this._toast$.toast({
        severity: 'contrast',
        icon: 'pi-check-circle',
        detail:
          'Message Content dsfsdfsdfsdfs assd sad sad dsdasdasdasdsa sadasd sd sadasd as  sdasdas ad asdas dasd as da ad sadsa dsa asdasdas asd asad',
        life: 3000,
        sticky: true,
      });

      setTimeout(() => {
        this._loaddingRegister$.set(false);
      }, 500);

      if (this._formRegister$.invalid) return;
    } catch (error: any) {
      alert(error.message);
    }

    /* const { passwordConfirm, ...register } = this._formRegister$.getRawValue();
    register.phone = register.phone.replace(/[^0-9+]/g, '');
    this._loaddingRegister$.set(true);
    this._auth$
      .register(register)
      .pipe(finalize(() => this._loaddingRegister$.set(false)))
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      }); */
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
