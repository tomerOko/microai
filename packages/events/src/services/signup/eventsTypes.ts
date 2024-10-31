// signup.ts (message queue events types)
import * as z from 'zod';
import { userCreatedEventValidation, userUpdatedEventValidation, userDeactivatedEventValidation } from './eventsValidations';

export type UserCreatedEventType = z.infer<typeof userCreatedEventValidation>;
export type UserUpdatedEventType = z.infer<typeof userUpdatedEventValidation>;
export type UserDeactivatedEventType = z.infer<typeof userDeactivatedEventValidation>;
