// search.ts (message queue events types)
import * as z from 'zod';
import { recommendationsGeneratedEventValidation } from './eventsValidations';

export type RecommendationsGeneratedEventType = z.infer<typeof recommendationsGeneratedEventValidation>;
