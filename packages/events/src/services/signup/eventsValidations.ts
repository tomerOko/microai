// signup.ts (message queue events validations)
import * as z from 'zod';
import { signupEventsNames } from './eventsNames';
import { userValidationProps } from './shared';

export const userCreatedEventValidation = z.object({
  type: z.literal(signupEventsNames.USER_CREATED),
  data: z.object(userValidationProps),
});

export const newPasswordSetEventValidation = z.object({
  type: z.literal(signupEventsNames.NEW_PASSWORD_SET),
  data: z.object({
    userID: z.string(),
  }),
});

export const oauthLinkedEventValidation = z.object({
  type: z.literal(signupEventsNames.OAUTH_LINKED),
  data: z.object({
    userID: z.string(),
    oauthProvider: z.string(),
  }),
});

export const authMethodAddedEventValidation = z.object({
  type: z.literal(signupEventsNames.AUTH_METHOD_ADDED),
  data: z.object({
    userID: z.string(),
    method: z.string(),
    oauthProvider: z.string().optional(),
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
