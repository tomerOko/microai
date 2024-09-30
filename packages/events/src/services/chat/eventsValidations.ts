// chats.ts (message queue events validations)
import { z } from 'zod';
import { chatEventsNames } from '../names';
import { messageValidationProps } from '../../shared/validations/chats';

export const messageSentEventValidation = z.object({
  type: z.literal(chatEventsNames.MESSAGE_SENT),
  data: z.object({
    chatRoomID: z.string(),
    message: z.object(messageValidationProps),
  }),
});
