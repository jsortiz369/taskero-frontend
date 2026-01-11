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
      _id: z.uuidv4({ error: 'El valor de _id debe ser un uuidv4' }).nonoptional({ error: 'El valor de _id es requerido' }),
      names: z
        .string({ error: 'El valor de names debe ser un string' })
        .min(3, { error: 'El valor de names debe tener mínimo 3 caracteres' })
        .max(50, { error: 'El valor de names debe tener máximo 50 caracteres' })
        .nonoptional({ error: 'El valor de names es requerido' }),
      surnames: z
        .string({ error: 'El valor de surnames debe ser un string' })
        .min(3, { error: 'El valor de surnames debe tener mínimo 3 caracteres' })
        .max(50, { error: 'El valor de surnames debe tener máximo 50 caracteres' })
        .nonoptional({ error: 'El valor de surnames es requerido' }),
      birthday: z.date({ error: 'El valor de birthday debe ser una fecha' }).nonoptional({ error: 'El valor de birthday es requerido' }),
      phone: z
        .string({ error: 'El valor de phone debe ser un string' })
        .min(10, { error: 'El valor de phone debe tener mínimo 10 caracteres' })
        .max(14, { error: 'El valor de phone debe tener máximo 14 caracteres' })
        .nonoptional({ error: 'El valor de phone es requerido' }),
      email: z
        .email({ error: 'El valor de email debe ser un email válido' })
        .min(5, { error: 'El valor de email debe tener mínimo 5 caracteres' })
        .max(50, { error: 'El valor de email debe tener máximo 50 caracteres' })
        .nonoptional({ error: 'El valor de email es requerido' }),
      status: z.boolean({ error: 'El valor de status debe ser un booleano' }).nonoptional({ error: 'El valor de status es requerido' }),
      createdAt: z.date({ error: 'El valor de createdAt debe ser una fecha' }).nonoptional({ error: 'El valor de createdAt es requerido' }),
      updatedAt: z.date({ error: 'El valor de updatedAt debe ser una fecha' }).nonoptional({ error: 'El valor de updatedAt es requerido' }),
    },
    {
      error: (issue) => ({ message: `llaves no reconocidas: "${(issue.keys as string[]).join('", "')}"` }),
    },
  )
  .strict();
