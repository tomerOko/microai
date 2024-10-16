// auth.ts (db documents validation)
import { z } from 'zod';
import { userValidationProps } from './shared';

export const authDbValidations = {
  user: z.object(userValidationProps),
};
