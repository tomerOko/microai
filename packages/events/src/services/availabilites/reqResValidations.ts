// auth.ts (request and response validations)
import { z } from 'zod';

export const loginRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const loginResponseValidation = z.object({
  token: z.string(),
});

export const oauthLoginRequestValidation = z.object({
  body: z.object({
    provider: z.string(),
    providerToken: z.string(),
  }),
});

export const oauthLoginResponseValidation = z.object({
  token: z.string(),
});
