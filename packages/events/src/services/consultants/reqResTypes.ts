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

export type becomeConsultantRequestType = z.infer<typeof becomeConsultantRequestValidation>;
export type becomeConsultantResponseType = z.infer<typeof becomeConsultantResponseValidation>;

export type updateConsultantProfileRequestType = z.infer<typeof updateConsultantProfileRequestValidation>;
export type updateConsultantProfileResponseType = z.infer<typeof updateConsultantProfileResponseValidation>;

export type addTopicRequestType = z.infer<typeof addTopicRequestValidation>;
export type addTopicResponseType = z.infer<typeof addTopicResponseValidation>;

export type updateTopicRequestType = z.infer<typeof updateTopicRequestValidation>;
export type updateTopicResponseType = z.infer<typeof updateTopicResponseValidation>;

export type removeTopicRequestType = z.infer<typeof removeTopicRequestValidation>;
export type removeTopicResponseType = z.infer<typeof removeTopicResponseValidation>;
