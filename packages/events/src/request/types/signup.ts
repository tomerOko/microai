// types/signup.ts
import * as z from 'zod';
import {
  sendPincodeRequestValidation,
  sendPincodeResponseValidation,
  signupRequestValidation,
  signupResponseValidation,
  signupOAuthRequestValidation,
  signupOAuthResponseValidation,
  addAuthMethodRequestValidation,
  addAuthMethodResponseValidation,
  updateProfileRequestValidation,
  updateProfileResponseValidation,
  updatePasswordRequestValidation,
  updatePasswordResponseValidation,
} from '../validation/signup';

export type sendPincodeRequestType = z.infer<typeof sendPincodeRequestValidation>;
export type sendPincodeResponseType = z.infer<typeof sendPincodeResponseValidation>;

export type signupRequestType = z.infer<typeof signupRequestValidation>;
export type signupResponseType = z.infer<typeof signupResponseValidation>;

export type signupOAuthRequestType = z.infer<typeof signupOAuthRequestValidation>;
export type signupOAuthResponseType = z.infer<typeof signupOAuthResponseValidation>;

export type addAuthMethodRequestType = z.infer<typeof addAuthMethodRequestValidation>;
export type addAuthMethodResponseType = z.infer<typeof addAuthMethodResponseValidation>;

export type updateProfileRequestType = z.infer<typeof updateProfileRequestValidation>;
export type updateProfileResponseType = z.infer<typeof updateProfileResponseValidation>;

export type updatePasswordRequestType = z.infer<typeof updatePasswordRequestValidation>;
export type updatePasswordResponseType = z.infer<typeof updatePasswordResponseValidation>;
