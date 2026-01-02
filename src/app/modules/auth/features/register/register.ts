import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { Floating } from '../../ui/floating/floating';
import { RegisterModel } from '../../models/register.model';
import { AppModule } from '../../../../app.module';

@Component({
  selector: 'app-register',
  imports: [AppModule, Floating, CardModule, ButtonModule, InputTextModule],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register implements OnInit {
  private readonly _fb$ = inject(FormBuilder);

  protected readonly cardFullScreen = signal(false);
  protected readonly _formRegister$ = this._fb$.group<RegisterModel>({
    names: this._fb$.nonNullable.control('', [Validators.required]),
    surnames: this._fb$.nonNullable.control('', [Validators.required]),
    birthday: this._fb$.nonNullable.control(undefined as unknown as Date, [Validators.required]),
    phone: this._fb$.nonNullable.control('', [Validators.required]),
    email: this._fb$.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ]),
    password: this._fb$.nonNullable.control('', [Validators.required]),
    passwordConfirm: this._fb$.nonNullable.control('', [Validators.required]),
  });

  constructor() {}

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
}
