import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from '../models/register.model';

/* export const NAMES = new FormControl('', { validators: Validators.required, nonNullable: true });
export const SURNAME = new FormControl('', { validators: Validators.required, nonNullable: true });

export const registerSchema = new FormGroup<RegisterModel>({
    names: NAMES,
    surnames: SURNAME,
    birthday: this._fb$.nonNullable.control(undefined as unknown as Date, [Validators.required]),
    phone: this._fb$.nonNullable.control('', [Validators.required]),
    email: this._fb$.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ]),
    password: this._fb$.nonNullable.control('', [Validators.required]),
    passwordConfirm: this._fb$.nonNullable.control('', [Validators.required]),
  }); */
