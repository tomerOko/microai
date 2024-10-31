import * as z from 'zod';
import { signupEventsNames } from './eventsNames';
import { userValidationProps } from './shared';

export const userCreatedEventValidation = z.object({
  type: z.literal(signupEventsNames.USER_CREATED),
  data: z.object(userValidationProps),
});

export const userUpdatedEventValidation = z.object({
  type: z.literal(signupEventsNames.USER_UPDATED),
  data: z.object(userValidationProps),
});

export const userDeactivatedEventValidation = z.object({
  type: z.literal(signupEventsNames.USER_DEACTIVATED),
  data: z.object({
    userID: z.string(),
  }),
});
