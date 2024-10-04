// shared/validations/send.ts
import { z } from 'zod';

export const channelEnum = z.enum(['EMAIL', 'SMS', 'WHATSAPP', 'PUSH_NOTIFICATION']);
export type Channel = z.infer<typeof channelEnum>;

export const messageContentSchema = z.object({
  subject: z.string().optional(),
  body: z.string(),
});

export const deliveryStatusSchema = z.object({
  deliveryID: z.string(),
  userID: z.string(),
  channels: z.array(channelEnum),
  content: messageContentSchema,
  status: z.enum(['SUCCEEDED', 'FAILED']),
  timestamp: z.string(),
  error: z.string().optional(),
});
