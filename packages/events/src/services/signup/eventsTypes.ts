// signup.ts (message queue events types)
import * as z from 'zod';
import {
  userCreatedEventValidation,
  newPasswordSetEventValidation,
  sendNotificationEventValidation,
  userUpdatedEventValidation,
  userDeactivatedEventValidation,
} from './eventsValidations';

export type UserCreatedEventType = z.infer<typeof userCreatedEventValidation>;
export type UserUpdatedEventType = z.infer<typeof userUpdatedEventValidation>;
export type UserDeactivatedEventType = z.infer<typeof userDeactivatedEventValidation>;
export type NewPasswordSetEventType = z.infer<typeof newPasswordSetEventValidation>;
export type SendNotificationEventType = z.infer<typeof sendNotificationEventValidation>;
