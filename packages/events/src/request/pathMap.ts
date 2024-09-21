import { ZodSchema } from 'zod';
import {
  becomeTeacherRequestValidation,
  becomeTeacherResponseValidation,
  stopTeachRequestValidation,
  loginRequestValidation,
  loginRespondValidation,
  sendPincodeRequestValidation,
  sendPincodeRespondValidation,
  signupRequestValidation,
  signupRespondValidation,
  updateTeacherDetailsRequestValidation,
  updateTeacherDetailsResponseValidation,
  addTopicRequestValidation,
  addTopicResponseValidation,
  updateTopicRequestValidation,
  updateTopicResponseValidation,
  deleteTopicRequestValidation,
  deleteTopicResponseValidation,
  addPaymentMethodRequestValidation,
  addPaymentMethodResponseValidation,
  updatePaymentMethodRequestValidation,
  updatePaymentMethodResponseValidation,
  deletePaymentMethodRequestValidation,
  deletePaymentMethodResponseValidation,
  addWithdrawMethodRequestValidation,
  addWithdrawMethodResponseValidation,
  updateWithdrawMethodRequestValidation,
  updateWithdrawMethodResponseValidation,
  deleteWithdrawMethodRequestValidation,
  deleteWithdrawMethodResponseValidation,
  getPaymentMethodsRequestValidation,
  getPaymentMethodsResponseValidation,
  getWithdrawMethodsRequestValidation,
  getWithdrawMethodsResponseValidation,
  signupOAuthRequestValidation,
  signupOAuthResponseValidation,
  addAuthMethodRequestValidation,
  addAuthMethodResponseValidation,
  updateProfileRequestValidation,
  updateProfileResponseValidation,
  updatePasswordRequestValidation,
  updatePasswordResponseValidation,
} from './validation';
import path from 'path';
import {
  searchRequestValidation,
  searchResponseValidation,
  searchWithFiltersRequestValidation,
  searchWithFiltersResponseValidation,
} from './validation/search';
import { get } from 'http';

const servicesNames = {
  signup: 'signup',
  meet: 'meet',
  call: 'call',
  auth: 'auth',
  search: 'search',
  teach: 'teach',
  paymnent: 'payment',
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
    responseValidation: sendPincodeRespondValidation,
    service: servicesNames.signup,
  },
  SIGNUP: {
    path: '/signup',
    method: 'post',
    requestValidation: signupRequestValidation,
    responseValidation: signupRespondValidation,
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
} as const;
