// calls.ts (message queue events validations)
import { z } from 'zod';
import { callEventsNames } from '../names';

export const callStartedEventValidation = z.object({
  type: z.literal(callEventsNames.CALL_STARTED),
  data: z.object({
    callID: z.string(),
    bookingID: z.string(),
    participants: z.array(z.string()),
  }),
});

export const callEndedEventValidation = z.object({
  type: z.literal(callEventsNames.CALL_ENDED),
  data: z.object({
    callID: z.string(),
    bookingID: z.string(),
    participants: z.array(z.string()),
  }),
});
