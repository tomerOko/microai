// dbValidations/sockets.ts
import { z } from 'zod';
import { userValidationProps } from '../shared/validations/sockets';

export const socketsDbValidations = {
  user: z.object(userValidationProps),
};
