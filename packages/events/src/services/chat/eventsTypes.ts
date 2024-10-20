// chats.ts (message queue events types)
import * as z from 'zod';
import { chatMessageSentEventValidation } from './eventsValidations';

export type ChatMessageSentEventType = z.infer<typeof chatMessageSentEventValidation>;
