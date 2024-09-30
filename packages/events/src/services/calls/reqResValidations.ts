// calls.ts (request and response validations)
import { z } from 'zod';

export const startCallRequestValidation = z.object({
  body: z.object({
    callID: z.string(),
  }),
});

export const startCallResponseValidation = z.object({
  callURL: z.string(),
});

export const endCallRequestValidation = z.object({
  body: z.object({
    callID: z.string(),
  }),
});

export const endCallResponseValidation = z.object({});

export const getCallDetailsRequestValidation = z.object({
  params: z.object({
    callID: z.string(),
  }),
});

export const getCallDetailsResponseValidation = z.object({
  callID: z.string(),
  bookingID: z.string(),
  studentID: z.string(),
  consultantID: z.string(),
  callURL: z.string(),
  status: z.enum(['scheduled', 'in-progress', 'completed', 'cancelled']),
  scheduledAt: z.string(),
});
