import { FormControl } from '@angular/forms';
import { registerValidatorsSchema } from '../schemas/register.schemas';
import z from 'zod';

export type RegisterModel = {
  names: FormControl<string>;
  surnames: FormControl<string>;
  birthday: FormControl<Date>;
  phone: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  passwordConfirm: FormControl<string>;
};

export type ResponseRegisterExist = z.infer<typeof registerValidatorsSchema>;

export type RegisterForm = {
  names: string;
  surnames: string;
  birthday: Date;
  phone: string;
  email: string;
  password: string;
};
