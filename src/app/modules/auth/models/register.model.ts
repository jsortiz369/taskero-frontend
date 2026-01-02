import { FormControl } from '@angular/forms';

export type RegisterModel = {
  names: FormControl<string>;
  surnames: FormControl<string>;
  birthday: FormControl<Date>;
  phone: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  passwordConfirm: FormControl<string>;
};
