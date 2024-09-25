import { ZodSchema } from 'zod';
import {
  loginRequestValidation,
  loginResponseValidation,
  oauthLoginRequestValidation,
  oauthLoginResponseValidation,
} from './validation';
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
  BECOME_CONSULTANT: {
    path: '/become-consultant',
    method: 'post',
    service: servicesNames.consultant,
    requestValidation: becomeConsultantRequestValidation,
    responseValidation: becomeConsultantResponseValidation,
  },
  UPDATE_CONSULTANT_PROFILE: {
    path: '/update-consultant-profile',
    method: 'put',
    service: servicesNames.consultant,
    requestValidation: updateConsultantProfileRequestValidation,
    responseValidation: updateConsultantProfileResponseValidation,
  },
  ADD_TOPIC: {
    path: '/add-topic',
    method: 'post',
    service: servicesNames.consultant,
    requestValidation: addTopicRequestValidation,
    responseValidation: addTopicResponseValidation,
  },
  UPDATE_TOPIC: {
    path: '/update-topic',
    method: 'put',
    service: servicesNames.consultant,
    requestValidation: updateTopicRequestValidation,
    responseValidation: updateTopicResponseValidation,
  },
  REMOVE_TOPIC: {
    path: '/remove-topic',
    method: 'delete',
    service: servicesNames.consultant,
    requestValidation: removeTopicRequestValidation,
    responseValidation: removeTopicResponseValidation,
  },
  SET_DEFAULT_SCHEDULE: {
    path: '/set-default-schedule',
    method: 'post',
    service: servicesNames.availabilities,
    requestValidation: setDefaultScheduleRequestValidation,
    responseValidation: setDefaultScheduleResponseValidation,
  },
  UPDATE_WEEKLY_SCHEDULE: {
    path: '/update-weekly-schedule',
    method: 'put',
    service: servicesNames.availabilities,
    requestValidation: updateWeeklyScheduleRequestValidation,
    responseValidation: updateWeeklyScheduleResponseValidation,
  },
  TOGGLE_AVAILABLE_NOW: {
    path: '/toggle-available-now',
    method: 'post',
    service: servicesNames.availabilities,
    requestValidation: toggleAvailableNowRequestValidation,
    responseValidation: toggleAvailableNowResponseValidation,
  },
  CHECK_AVAILABILITY: {
    path: '/check-availability',
    method: 'get',
    service: servicesNames.availabilities,
    requestValidation: checkAvailabilityRequestValidation,
    responseValidation: checkAvailabilityResponseValidation,
  },
} as const;
