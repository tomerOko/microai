import * as z from 'zod';
import {
  oAuthLoginRequestValidation,
  oAuthLoginResponseValidation,
  passwordLoginRequestValidation,
  passwordLoginResponseValidation,
} from './reqResValidations';

export type PasswordLoginRequestType = z.infer<typeof passwordLoginRequestValidation>;
export type PasswordLoginResponseType = z.infer<typeof passwordLoginResponseValidation>;

export type OAuthLoginRequestType = z.infer<typeof oAuthLoginRequestValidation>;
export type OAuthLoginResponseType = z.infer<typeof oAuthLoginResponseValidation>;
