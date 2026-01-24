import { FormControl } from '@angular/forms';
import z from 'zod';
import { validLoginSchema } from '../schemas/login.schema';

export type LoginModel = {
  username: FormControl<string>;
  password: FormControl<string>;
};

export type LoginForm = {
  username: string;
  password: string;
};

export type ResponseLogin = z.infer<typeof validLoginSchema>;
