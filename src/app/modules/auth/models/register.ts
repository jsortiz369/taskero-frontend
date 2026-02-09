import { FormControl } from '@angular/forms';
import { registerSchema, registerConflictSchema } from '../schemas/register';
import z from 'zod';

export type RegisterModel = {
  names: FormControl<string>;
  surnames: FormControl<string>;
  username: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  passwordConfirm: FormControl<string>;
};

export type RegisterForm = {
  names: string;
  surnames: string;
  username: string;
  phone: string;
  email: string;
  password: string;
};

export type ResponseRegisterConflict = z.infer<typeof registerConflictSchema>;

export type ResponseRegister = z.infer<typeof registerSchema>;
