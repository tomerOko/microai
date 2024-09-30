// chats.ts (shared validations)
import z from 'zod';

export const messageValidationProps = {
  senderID: z.string(),
  content: z.string(),
  timestamp: z.string(), // ISO date string
  messageType: z.enum(['text', 'image', 'file']),
};

export const chatRoomValidationProps = {
  ID: z.string().optional(),
  bookingID: z.string(),
  participants: z.array(z.string()),
  createdAt: z.string(), // ISO date string
  messages: z.array(z.object(messageValidationProps)),
  isArchived: z.boolean().optional(),
};
