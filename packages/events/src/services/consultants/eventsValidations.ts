// consultant.ts (message queue events validations)
import * as z from 'zod';
import { consultantEventsNames } from './eventsNames';
import { consultantValidationProps, topicValidationProps } from './shared';

export const consultantOnboardedEventValidation = z.object({
  type: z.literal(consultantEventsNames.CONSULTANT_ONBOARDED),
  data: z.object(consultantValidationProps),
});

export const consultantProfileUpdatedEventValidation = z.object({
  type: z.literal(consultantEventsNames.CONSULTANT_PROFILE_UPDATED),
  data: z.object(consultantValidationProps),
});

export const topicAddedEventValidation = z.object({
  type: z.literal(consultantEventsNames.TOPIC_ADDED),
  data: z.object(topicValidationProps),
});

export const topicUpdatedEventValidation = z.object({
  type: z.literal(consultantEventsNames.TOPIC_UPDATED),
  data: z.object(topicValidationProps),
});

export const topicRemovedEventValidation = z.object({
  type: z.literal(consultantEventsNames.TOPIC_REMOVED),
  data: z.object({
    topicID: z.string(),
  }),
});
