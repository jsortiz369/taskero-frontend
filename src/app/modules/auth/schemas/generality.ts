import z from 'zod';

export const successSchema = z
  .object(
    { success: z.boolean({ error: 'El valor de success debe ser booleano' }).nonoptional({ error: 'El valor de success es requerido' }) },
    { error: (issue) => ({ message: `llaves no reconocidas: "${(issue.keys as string[]).join('", "')}"` }) },
  )
  .strict();

export const messageSchema = z
  .object(
    { success: z.string({ error: 'El valor de success debe ser cadena de texto' }).nonoptional({ error: 'El valor de success es requerido' }) },
    { error: (issue) => ({ message: `llaves no reconocidas: "${(issue.keys as string[]).join('", "')}"` }) },
  )
  .strict();
