// types/events/signup.ts
import * as z from 'zod';
import {
  sendPincodeEmailEventValidation,
  userCreatedEventValidation,
  newPasswordSetEventValidation,
  oauthLinkedEventValidation,
  authMethodAddedEventValidation,
} from '../validations/signup';

export type SendPincodeEmailEventType = z.infer<typeof sendPincodeEmailEventValidation>;
export type UserCreatedEventType = z.infer<typeof userCreatedEventValidation>;
export type NewPasswordSetEventType = z.infer<typeof newPasswordSetEventValidation>;
export type OAuthLinkedEventType = z.infer<typeof oauthLinkedEventValidation>;
export type AuthMethodAddedEventType = z.infer<typeof authMethodAddedEventValidation>;
