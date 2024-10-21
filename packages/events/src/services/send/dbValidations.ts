import { z } from 'zod';
import { deliveryStatusSchema, messageContentSchema } from './shared';
import { copyFileSync } from 'fs';

export const sendDbValidations = {
  user: z.object({
    userID: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string().optional(),
    deviceTokens: z.array(z.string()).optional(),
  }),
  message: z.object({
    messageID: z.string(),
    userID: z.string(),
    channels: z.array(z.enum(['EMAIL', 'SMS', 'WHATSAPP', 'PUSH_NOTIFICATION'])),
    content: messageContentSchema,
    timestamp: z.string(),
  }),
  deliveryStatus: deliveryStatusSchema,
};

console.log('sendDbValidations');
