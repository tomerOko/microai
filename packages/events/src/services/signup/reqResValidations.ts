// signup.ts (request and response validations)
import { z } from 'zod';
import { authenticationMethodValidation, passwordValidation, pincodeValidation, userValidationPropsMinimal } from './shared';

export const signupEmailRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const signupEmailResponseValidation = z.object({
  message: z.string(),
});

export const verifyPincodeRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
    pincode: pincodeValidation,
    firstName: z.string(),
    lastName: z.string(),
    password: passwordValidation,
  }),
});

export const verifyPincodeResponseValidation = z.object({
  userID: z.string(),
});

export const signupOAuthRequestValidation = z.object({
  body: z.object({
    oauthProvider: z.string(),
    oauthToken: z.string(),
  }),
});

export const signupOAuthResponseValidation = z.object({
  userID: z.string(),
});

export const addAuthMethodRequestValidation = z.object({
  body: z.object({
    userID: z.string(),
    authenticationMethod: authenticationMethodValidation,
  }),
});

export const addAuthMethodResponseValidation = z.object({
  message: z.string(),
});

export const updateProfileRequestValidation = z.object({
  body: z.object({
    userID: z.string(),
    profile: z.object(userValidationPropsMinimal).partial(),
  }),
});

export const updateProfileResponseValidation = z.object({
  message: z.string(),
});
