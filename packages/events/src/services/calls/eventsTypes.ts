// calls.ts (message queue events types)
import * as z from 'zod';
import { callStartedEventValidation, callEndedEventValidation } from '../validations/calls';

export type CallStartedEventType = z.infer<typeof callStartedEventValidation>;
export type CallEndedEventType = z.infer<typeof callEndedEventValidation>;
