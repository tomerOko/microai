// dbValidations/sockets.ts
import { z } from 'zod';
import { socketUserValidationProps } from './shared';

export const socketsDbValidations = {
  user: z.object(socketUserValidationProps),
};
