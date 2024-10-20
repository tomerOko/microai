// chats.ts (request and response validations)
import { z } from 'zod';
import { messageValidationProps } from './shared';

export const sendMessageRequestValidation = z.object({
  body: z.object({
    chatRoomID: z.string(),
    content: z.string(),
    messageType: z.enum(['text', 'image', 'file']),
  }),
});

export const sendMessageResponseValidation = z.object({
  messageID: z.string(),
});

export const getChatRoomMessagesRequestValidation = z.object({
  params: z.object({
    chatRoomID: z.string(),
  }),
});

export const getChatRoomMessagesResponseValidation = z.object({
  messages: z.array(z.object(messageValidationProps)),
});

export const getChatRoomsRequestValidation = z.object({});

export const getChatRoomsResponseValidation = z.object({
  chatRooms: z.array(
    z.object({
      ID: z.string(),
      bookingID: z.string(),
      participants: z.array(z.string()),
      createdAt: z.string(),
      isArchived: z.boolean().optional(),
    }),
  ),
});
