// signup.ts (message queue events types)
import * as z from 'zod';
import {
  userCreatedEventValidation,
  newPasswordSetEventValidation,
  oauthLinkedEventValidation,
  authMethodAddedEventValidation,
  sendNotificationEventValidation,
} from '../validations/signup';

export type UserCreatedEventType = z.infer<typeof userCreatedEventValidation>;
export type NewPasswordSetEventType = z.infer<typeof newPasswordSetEventValidation>;
export type OAuthLinkedEventType = z.infer<typeof oauthLinkedEventValidation>;
export type AuthMethodAddedEventType = z.infer<typeof authMethodAddedEventValidation>;
export type SendNotificationEventType = z.infer<typeof sendNotificationEventValidation>;
