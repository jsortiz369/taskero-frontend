import { FormControl } from '@angular/forms';
import { messageSchema } from '../schemas/generality';
import z from 'zod';

export type RecoverPasswordModel = {
  username: FormControl<string>;
};

export type ResponseRecoverPassword = z.infer<typeof messageSchema>;
