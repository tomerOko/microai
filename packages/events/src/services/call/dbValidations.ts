// calls.ts (db documents validation)
import { z } from 'zod';
import { callValidationProps } from './shared';

export const callsDbValidations = {
  call: z.object(callValidationProps),
};
