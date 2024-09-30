// chats.ts (message queue events types)
import * as z from 'zod';
import { messageSentEventValidation } from '../validations/chats';

export type MessageSentEventType = z.infer<typeof messageSentEventValidation>;
