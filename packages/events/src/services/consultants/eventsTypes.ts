// consultant.ts (message queue events types)
import * as z from 'zod';
import {
  consultantOnboardedEventValidation,
  consultantProfileUpdatedEventValidation,
  topicAddedEventValidation,
  topicUpdatedEventValidation,
  topicRemovedEventValidation,
} from '../validations/consultant';

export type ConsultantOnboardedEventType = z.infer<typeof consultantOnboardedEventValidation>;
export type ConsultantProfileUpdatedEventType = z.infer<typeof consultantProfileUpdatedEventValidation>;
export type TopicAddedEventType = z.infer<typeof topicAddedEventValidation>;
export type TopicUpdatedEventType = z.infer<typeof topicUpdatedEventValidation>;
export type TopicRemovedEventType = z.infer<typeof topicRemovedEventValidation>;
