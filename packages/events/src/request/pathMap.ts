import { ZodSchema } from 'zod';
import {
  addAuthMethodRequestValidation,
  addAuthMethodResponseValidation,
  loginRequestValidation,
  loginResponseValidation,
  oauthLoginRequestValidation,
  oauthLoginResponseValidation,
  sendPincodeRequestValidation,
  sendPincodeResponseValidation,
  signupOAuthRequestValidation,
  signupOAuthResponseValidation,
  signupRequestValidation,
  signupResponseValidation,
  updatePasswordRequestValidation,
  updatePasswordResponseValidation,
  updateProfileRequestValidation,
  updateProfileResponseValidation,
} from './validation';
import {
  checkAvailabilityRequestValidation,
  checkAvailabilityResponseValidation,
  setDefaultScheduleRequestValidation,
  setDefaultScheduleResponseValidation,
  toggleAvailableNowRequestValidation,
  toggleAvailableNowResponseValidation,
  updateWeeklyScheduleRequestValidation,
  updateWeeklyScheduleResponseValidation,
} from './validation/availabilities';
import {
  addTopicRequestValidation,
  addTopicResponseValidation,
  becomeConsultantRequestValidation,
  becomeConsultantResponseValidation,
  removeTopicRequestValidation,
  removeTopicResponseValidation,
  updateConsultantProfileRequestValidation,
  updateConsultantProfileResponseValidation,
  updateTopicRequestValidation,
  updateTopicResponseValidation,
} from './validation/consultants';

const servicesNames = {
  availabilities: 'availabilities',
  auth: 'auth',
  call: 'call',
  chat: 'chat',
  consultants: 'consultants',
  meet: 'meet',
  notifications: 'notifications',
  paymnent: 'payment',
  search: 'search',
  signup: 'signup',
} as const;

export type ServiceName = (typeof servicesNames)[keyof typeof servicesNames];

export type Path = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  requestValidation: ZodSchema<any>;
  responseValidation: ZodSchema<any>;
  service: ServiceName;
};

export const pathMap = {
  LOGIN: {
    path: '/login',
    method: 'post',
    service: servicesNames.auth,
    requestValidation: loginRequestValidation,
    responseValidation: loginResponseValidation,
  },
  OAUTH_LOGIN: {
    path: '/oauth-login',
    method: 'post',
    service: servicesNames.auth,
    requestValidation: oauthLoginRequestValidation,
    responseValidation: oauthLoginResponseValidation,
  },
} as const;
