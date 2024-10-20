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
    userId: z.string(),
  }),
});

export const newPasswordSetEventValidation = z.object({
  type: z.literal(signupEventsNames.NEW_PASSWORD_SET),
  data: z.object({
    userID: z.string(),
  }),
});

export const sendNotificationEventValidation = z.object({
  type: z.literal(signupEventsNames.SEND_NOTIFICATION),
  data: z.object({
    type: z.enum(['EMAIL', 'SMS', 'PUSH']),
    recipient: z.string(),
    subject: z.string().optional(),
    message: z.string(),
  }),
});
