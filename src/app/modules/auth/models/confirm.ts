import { FormControl } from '@angular/forms';
import z from 'zod';

import { loginSchema } from '../schemas/login';
import { successSchema } from '../schemas/generality';

export type ConfirmModel = {
  otp: FormControl<string>;
};

export type ResponseConfirm = z.infer<typeof loginSchema>;
export type ResponseResend = z.infer<typeof successSchema>;
