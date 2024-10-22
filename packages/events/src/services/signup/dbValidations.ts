// signup.ts (db documents validation)
import { z } from 'zod';
import { userValidationProps } from './shared';

export const signupDbValidations = {
  user: z.object(userValidationProps),
  pincode: z.object({
    email: z.string().email(),
    pincode: z.string(),
    createdAt: z.date(),
  }),
};
