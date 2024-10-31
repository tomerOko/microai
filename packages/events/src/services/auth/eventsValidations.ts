// auth.ts (message queue events validations)
import { z } from 'zod';
import { authEventsNames } from './eventsNames';
import { authUserValidationProps } from './shared';

export const authSuccessEventValidation = z.object({
  type: z.literal(authEventsNames.AUTH_SUCCESS),
  data: z.object({ userId: z.string() }),
});

export const authFailureEventValidation = z.object({
  type: z.literal(authEventsNames.AUTH_FAILURE),
  data: z.object({ userId: z.string().optional(), email: z.string(), reason: z.string() }),
});
