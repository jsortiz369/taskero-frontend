import z from 'zod';
import { registerSchema } from './register.schemas';

export const loginSchema = z
  .object(
    {
      token: z.string({ error: 'El valor de token debe ser cadena' }).nonoptional({ error: 'El valor de token es requerido' }),
      tokenRefresh: z.string({ error: 'El valor de tokenRefresh debe ser cadena' }).nonoptional({ error: 'El valor de tokenRefresh es requerido' }),
      data: z.object({
        names: z.string({ error: 'El valor de names debe ser cadena' }).nonoptional({ error: 'El valor de names es requerido' }),
        surnames: z.string({ error: 'El valor de surnames debe ser cadena' }).nonoptional({ error: 'El valor de surnames es requerido' }),
        username: z.string({ error: 'El valor de username debe ser cadena' }).nonoptional({ error: 'El valor de username es requerido' }),
        email: z.string({ error: 'El valor de email debe ser cadena' }).nonoptional({ error: 'El valor de email es requerido' }),
      }),
    },
    { error: (issue) => ({ message: `llaves no reconocidas: "${(issue.keys as string[]).join('", "')}"` }) },
  )
  .strict();

export const validLoginSchema = z.union([registerSchema, loginSchema], { message: 'la llave no es válida' });
