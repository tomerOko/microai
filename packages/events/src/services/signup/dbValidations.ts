// signup.ts (db documents validation)
import { z } from 'zod';
import { userValidationProps, pincodeValidation } from '../shared/validations/signup';

export const signupDbValidations = {
  user: z.object(userValidationProps),
  pincode: z.object({
    email: z.string().email(),
    pincode: pincodeValidation,
    createdAt: z.date(),
  }),
};
