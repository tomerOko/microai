// dbValidations/sockets.ts
import { z } from 'zod';
import { userValidationProps } from './shared';

export const socketsDbValidations = {
  user: z.object(userValidationProps),
};
