// dbValidations/signup.ts
import { z } from 'zod';
import { pincodeEntryValidationProps, userValidationProps } from '../shared';

export const signupDbValidations = {
  user: z.object(userValidationProps),
  pincodeEntry: z.object(pincodeEntryValidationProps),
};
