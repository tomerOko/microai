// shared/validations/sockets.ts
import z from 'zod';

export const userValidationProps = {
  ID: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  status: z.enum(['online', 'offline']).default('offline'),
};
