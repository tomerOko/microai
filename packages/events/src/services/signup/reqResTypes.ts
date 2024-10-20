// signup.ts (request and response types)
import * as z from 'zod';
import {
  signupEmailRequestValidation,
  signupEmailResponseValidation,
  signupEmailPart2RequestValidation,
  signupEmailPart2ResponseValidation,
  updateProfileRequestValidation,
  updateProfileResponseValidation,
  deactivateUserRequestValidation,
  deactivateUserResponseValidation,
} from './reqResValidations';

export type SignupEmailRequestType = z.infer<typeof signupEmailRequestValidation>;
export type SignupEmailResponseType = z.infer<typeof signupEmailResponseValidation>;

export type SignupEmailPart2RequestType = z.infer<typeof signupEmailPart2RequestValidation>;
export type SignupEmailPart2ResponseType = z.infer<typeof signupEmailPart2ResponseValidation>;

export type UpdateProfileRequestType = z.infer<typeof updateProfileRequestValidation>;
export type UpdateProfileResponseType = z.infer<typeof updateProfileResponseValidation>;

export type DeactivateUserRequestValidation = z.infer<typeof deactivateUserRequestValidation>;
export type DeactivateUserResponseValidation = z.infer<typeof deactivateUserResponseValidation>;
