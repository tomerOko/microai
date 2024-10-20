// chats.ts (message queue events validations)
import { z } from 'zod';
import { chatEventsNames } from './eventsNames';
import { messageValidationProps } from './shared';

export const chatMessageSentEventValidation = z.object({
  type: z.literal(chatEventsNames.MESSAGE_SENT),
  data: z.object({
    chatRoomID: z.string(),
    message: z.object(messageValidationProps),
  }),
});
