// auth.ts (request and response types)
import * as z from 'zod';
import {
  loginRequestValidation,
  loginResponseValidation,
  oauthLoginRequestValidation,
  oauthLoginResponseValidation,
} from '../validation/auth';

export type loginRequestType = z.infer<typeof loginRequestValidation>;
export type loginResponseType = z.infer<typeof loginResponseValidation>;

export type oauthLoginRequestType = z.infer<typeof oauthLoginRequestValidation>;
export type oauthLoginResponseType = z.infer<typeof oauthLoginResponseValidation>;
