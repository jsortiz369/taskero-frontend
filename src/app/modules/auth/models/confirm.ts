import { FormControl } from '@angular/forms';
import z from 'zod';

import { loginSchema } from '../schemas/login.schema';

export type ConfirmModel = {
  otp: FormControl<string>;
};

export type ResponseConfirm = z.infer<typeof loginSchema>;
