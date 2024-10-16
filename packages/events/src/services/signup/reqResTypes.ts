// signup.ts (request and response types)
import * as z from 'zod';
import {
  signupEmailRequestValidation,
  signupEmailResponseValidation,
  verifyPincodeRequestValidation,
  verifyPincodeResponseValidation,
  signupOAuthRequestValidation,
  signupOAuthResponseValidation,
  addAuthMethodRequestValidation,
  addAuthMethodResponseValidation,
  updateProfileRequestValidation,
  updateProfileResponseValidation,
} from './reqResValidations';

export type signupEmailRequestType = z.infer<typeof signupEmailRequestValidation>;
export type signupEmailResponseType = z.infer<typeof signupEmailResponseValidation>;

export type verifyPincodeRequestType = z.infer<typeof verifyPincodeRequestValidation>;
export type verifyPincodeResponseType = z.infer<typeof verifyPincodeResponseValidation>;

export type signupOAuthRequestType = z.infer<typeof signupOAuthRequestValidation>;
export type signupOAuthResponseType = z.infer<typeof signupOAuthResponseValidation>;

export type addAuthMethodRequestType = z.infer<typeof addAuthMethodRequestValidation>;
export type addAuthMethodResponseType = z.infer<typeof addAuthMethodResponseValidation>;

export type updateProfileRequestType = z.infer<typeof updateProfileRequestValidation>;
export type updateProfileResponseType = z.infer<typeof updateProfileResponseValidation>;
