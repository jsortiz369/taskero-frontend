import z from 'zod';

export const registerConflictSchema = z
  .object(
    { exist: z.boolean({ error: 'El valor de exist debe ser un booleano' }).nonoptional({ error: 'El valor de exit es requerido' }) },
    { error: (issue) => ({ message: `llaves no reconocidas: "${(issue.keys as string[]).join('", "')}"` }) },
  )
  .strict();

export const registerSchema = z
  .object(
    { tokenConfirm: z.string({ error: 'El valor de tokenConfirm debe ser cadena' }).nonoptional({ error: 'El valor de tokenConfirm es requerido' }) },
    { error: (issue) => ({ message: `llaves no reconocidas: "${(issue.keys as string[]).join('", "')}"` }) },
  )
  .strict();
