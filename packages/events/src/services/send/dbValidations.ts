// dbValidations/send.ts
import { z } from 'zod';
import { messageContentSchema, deliveryStatusSchema } from '../shared/validations/send';
import { userValidationWithoutPasswordProps } from '../shared/validations/user';

export const sendDbValidations = {
  user: z.object({
    userID: z.string(),
    email: z.string().email(),
    phoneNumber: z.string().optional(),
    deviceTokens: z.array(z.string()).optional(),
    ...userValidationWithoutPasswordProps,
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
