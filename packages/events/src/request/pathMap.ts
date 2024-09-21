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
  consultants: 'consultants',
  meet: 'meet',
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
  SEND_PINCODE: {
    path: '/send-pincode',
    method: 'post',
    requestValidation: sendPincodeRequestValidation,
    responseValidation: sendPincodeResponseValidation,
    service: servicesNames.signup,
  },
  SIGNUP: {
    path: '/signup',
    method: 'post',
    requestValidation: signupRequestValidation,
    responseValidation: signupResponseValidation,
    service: servicesNames.signup,
  },
  SIGNUP_OAUTH: {
    path: '/signup-oauth',
    method: 'post',
    requestValidation: signupOAuthRequestValidation,
    responseValidation: signupOAuthResponseValidation,
    service: servicesNames.signup,
  },
  ADD_AUTH_METHOD: {
    path: '/add-auth-method',
    method: 'post',
    service: servicesNames.signup,
    requestValidation: addAuthMethodRequestValidation,
    responseValidation: addAuthMethodResponseValidation,
  },
  UPDATE_PROFILE: {
    path: '/update-profile',
    method: 'put',
    service: servicesNames.signup,
    requestValidation: updateProfileRequestValidation,
    responseValidation: updateProfileResponseValidation,
  },
  UPDATE_PASSWORD: {
    path: '/update-password',
    method: 'put',
    service: servicesNames.signup,
    requestValidation: updatePasswordRequestValidation,
    responseValidation: updatePasswordResponseValidation,
  },
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
    service: servicesNames.consultants,
    requestValidation: becomeConsultantRequestValidation,
    responseValidation: becomeConsultantResponseValidation,
  },
  UPDATE_CONSULTANT_PROFILE: {
    path: '/update-consultant-profile',
    method: 'put',
    service: servicesNames.consultants,
    requestValidation: updateConsultantProfileRequestValidation,
    responseValidation: updateConsultantProfileResponseValidation,
  },
  ADD_TOPIC: {
    path: '/add-topic',
    method: 'post',
    service: servicesNames.consultants,
    requestValidation: addTopicRequestValidation,
    responseValidation: addTopicResponseValidation,
  },
  UPDATE_TOPIC: {
    path: '/update-topic',
    method: 'put',
    service: servicesNames.consultants,
    requestValidation: updateTopicRequestValidation,
    responseValidation: updateTopicResponseValidation,
  },
  REMOVE_TOPIC: {
    path: '/remove-topic',
    method: 'delete',
    service: servicesNames.consultants,
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
