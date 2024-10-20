import { z } from 'zod';

export const passwordLoginRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const loginResponseValidation = z.object({
  token: z.string(),
});

export const passwordLoginResponseValidation = loginResponseValidation;
