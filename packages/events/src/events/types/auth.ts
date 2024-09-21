// auth.ts (message queue events types)
import * as z from 'zod';
import { authSuccessEventValidation, authFailureEventValidation } from '../validations/auth';

export type AuthSuccessEventType = z.infer<typeof authSuccessEventValidation>;
export type AuthFailureEventType = z.infer<typeof authFailureEventValidation>;
