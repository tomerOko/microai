import { z } from 'zod';
import { consultantValidationPropsMinimal, topicValidationPropsMinimal } from './shared';

export const becomeConsultantRequestValidation = z.object({
  body: z.object(consultantValidationPropsMinimal),
});

export const becomeConsultantResponseValidation = z.object({
  consultantID: z.string(),
});

export const updateConsultantProfileRequestValidation = z.object({
  body: z.object({
    consultantID: z.string(),
    consultant: z.object(consultantValidationPropsMinimal).partial(),
  }),
});

export const updateConsultantProfileResponseValidation = z.object({});

export const addTopicRequestValidation = z.object({
  body: z.object(topicValidationPropsMinimal),
});

export const addTopicResponseValidation = z.object({
  topicID: z.string(),
});

export const updateTopicRequestValidation = z.object({
  body: z.object({
    topicID: z.string(),
    topic: z.object(topicValidationPropsMinimal).partial(),
  }),
});

export const updateTopicResponseValidation = z.object({});

export const removeTopicRequestValidation = z.object({
  body: z.object({
    topicID: z.string(),
  }),
});

export const removeTopicResponseValidation = z.object({});
