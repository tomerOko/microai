// search.ts (message queue events validations)
import { z } from 'zod';
import { searchEventsNames } from './eventsNames';

export const recommendationsGeneratedEventValidation = z.object({
  type: z.literal(searchEventsNames.RECOMMENDATIONS_GENERATED),
  data: z.object({
    userID: z.string(),
    recommendations: z.array(z.string()), // Array of consultant IDs
  }),
});
