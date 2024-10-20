// auth.ts (db documents validation)
import { z } from 'zod';
import { authUserValidationProps } from './shared';

export const authDbValidations = {
  user: z.object(authUserValidationProps),
};
