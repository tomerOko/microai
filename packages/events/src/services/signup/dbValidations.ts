// signup.ts (db documents validation)
import { z } from 'zod';
import { pincodeValidation, userValidationProps } from './shared';

export const signupDbValidations = {
  user: z.object(userValidationProps),
  pincode: z.object({
    email: z.string().email(),
    pincode: pincodeValidation,
    createdAt: z.date(),
  }),
};
