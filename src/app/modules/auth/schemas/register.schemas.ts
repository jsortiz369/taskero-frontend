import z from 'zod';

export const registerValidators = z
  .object(
    {
      exist: z.boolean({ error: 'El valor de exist debe ser un booleano' }).nonoptional({ error: 'El valor de exit es requerido' }),
    },
    {
      error: (issue) => ({ message: `llaves no reconocidas: "${(issue.keys as string[]).join('", "')}"` }),
    },
  )
  .strict();
