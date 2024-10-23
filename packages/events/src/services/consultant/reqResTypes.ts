// consultant.ts (request and response types)
import * as z from 'zod';
import {
  becomeConsultantRequestValidation,
  becomeConsultantResponseValidation,
  updateConsultantProfileRequestValidation,
  updateConsultantProfileResponseValidation,
  addTopicRequestValidation,
  addTopicResponseValidation,
  updateTopicRequestValidation,
  updateTopicResponseValidation,
  removeTopicRequestValidation,
  removeTopicResponseValidation,
} from './reqResValidations';

export type BecomeConsultantRequestType = z.infer<typeof becomeConsultantRequestValidation>;
export type BecomeConsultantResponseType = z.infer<typeof becomeConsultantResponseValidation>;

export type UpdateConsultantProfileRequestType = z.infer<typeof updateConsultantProfileRequestValidation>;
export type UpdateConsultantProfileResponseType = z.infer<typeof updateConsultantProfileResponseValidation>;

export type AddTopicRequestType = z.infer<typeof addTopicRequestValidation>;
export type AddTopicResponseType = z.infer<typeof addTopicResponseValidation>;

export type UpdateTopicRequestType = z.infer<typeof updateTopicRequestValidation>;
export type UpdateTopicResponseType = z.infer<typeof updateTopicResponseValidation>;

export type RemoveTopicRequestType = z.infer<typeof removeTopicRequestValidation>;
export type RemoveTopicResponseType = z.infer<typeof removeTopicResponseValidation>;
