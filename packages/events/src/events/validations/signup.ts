// events/signup.ts
import * as z from 'zod';
import { signupEventsNames } from '../names';

export const sendPincodeEmailEventValidation = z.object({
  type: z.literal(signupEventsNames.SEND_PINCODE_EMAIL),
  data: z.object({
    email: z.string().email(),
    pincode: z.string().length(6),
  }),
});

export const userCreatedEventValidation = z.object({
  type: z.literal(signupEventsNames.USER_CREATED),
  data: z.object({
    userID: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
  }),
});

export const newPasswordSetEventValidation = z.object({
  type: z.literal(signupEventsNames.NEW_PASSWORD_SET),
  data: z.object({
    userID: z.string(),
    email: z.string().email(),
  }),
});

export const oauthLinkedEventValidation = z.object({
  type: z.literal(signupEventsNames.OAUTH_LINKED),
  data: z.object({
    userID: z.string(),
    email: z.string().email(),
    oauthProvider: z.string(),
  }),
});

export const authMethodAddedEventValidation = z.object({
  type: z.literal(signupEventsNames.AUTH_METHOD_ADDED),
  data: z.object({
    userID: z.string(),
    method: z.string(),
  }),
});
