// validation/signup.ts
import { z } from 'zod';
import { userValidationProps } from '../../shared/validations/signup';

export const sendPincodeRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const sendPincodeResponseValidation = z.object({});

export const signupRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
    pincode: z.string().length(6),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8),
  }),
});

export const signupResponseValidation = z.object({
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
    method: z.union([
      z.object({
        type: z.literal('email'),
        email: z.string().email(),
      }),
      z.object({
        type: z.literal('oauth'),
        oauthProvider: z.string(),
        oauthToken: z.string(),
      }),
    ]),
  }),
});

export const addAuthMethodResponseValidation = z.object({});

export const updateProfileRequestValidation = z.object({
  body: z.object({
    profile: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
    }),
  }),
});

export const updateProfileResponseValidation = z.object({});

export const updatePasswordRequestValidation = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(8),
  }),
});

export const updatePasswordResponseValidation = z.object({});
