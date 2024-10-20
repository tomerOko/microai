// signup.ts (request and response validations)
import { z } from 'zod';
import { passwordValidation, pincodeValidation, userValidationPropsMinimal } from './shared';

export const signupEmailRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const signupEmailResponseValidation = z.object({
  message: z.string(),
});

export const signupEmailPart2RequestValidation = z.object({
  body: z.object({
    pincode: pincodeValidation,
    password: passwordValidation,
    ...userValidationPropsMinimal,
  }),
});

export const signupEmailPart2ResponseValidation = z.object({
  userID: z.string(),
});

export const updateProfileRequestValidation = z.object({
  body: z.object(userValidationPropsMinimal).partial(),
});

export const updateProfileResponseValidation = z.object({
  message: z.string(),
});

export const deactivateUserRequestValidation = z.object({});

export const deactivateUserResponseValidation = z.object({
  message: z.string(),
});
