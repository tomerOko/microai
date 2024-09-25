// auth.ts (db documents validation)
import { z } from 'zod';
import { userValidationProps } from '../shared/validations/auth';

export const authDbValidations = {
  user: z.object(userValidationProps),
};
