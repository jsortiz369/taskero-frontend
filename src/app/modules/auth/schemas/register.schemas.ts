import z from 'zod';

export const registerValidatorsSchema = z
  .object(
    {
      exist: z.boolean({ error: 'El valor de exist debe ser un booleano' }).nonoptional({ error: 'El valor de exit es requerido' }),
    },
    {
      error: (issue) => ({ message: `llaves no reconocidas: "${(issue.keys as string[]).join('", "')}"` }),
    },
  )
  .strict();

export const registerShema = z
  .object(
    {
      username: z.string({ error: 'El valor de username debe ser cadena' }).nonoptional({ error: 'El valor de username es requerido' }),
      email: z
        .email({ error: 'El valor de email debe ser un email válido' })
        .min(5, { error: 'El valor de email debe tener mínimo 5 caracteres' })
        .max(50, { error: 'El valor de email debe tener máximo 50 caracteres' })
        .nonoptional({ error: 'El valor de email es requerido' }),
    },
    {
      error: (issue) => ({ message: `llaves no reconocidas: "${(issue.keys as string[]).join('", "')}"` }),
    },
  )
  .strict();
