// auth.ts (message queue events validations)
import { z } from 'zod';
import { authEventsNames } from '../names';

export const authSuccessEventValidation = z.object({
  type: z.literal(authEventsNames.AUTH_SUCCESS),
  data: z.object({
    userID: z.string(),
  }),
});

export const authFailureEventValidation = z.object({
  type: z.literal(authEventsNames.AUTH_FAILURE),
  data: z.object({
    userID: z.string().optional(),
    email: z.string().optional(),
    provider: z.string().optional(),
    reason: z.string(),
  }),
});
