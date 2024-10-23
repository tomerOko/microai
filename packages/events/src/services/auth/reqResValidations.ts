import { z } from 'zod';
import { authUserValidationProps } from './shared';

export const passwordLoginRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const loginResponseValidation = z.object({
  token: z.string(),
  user: z.object(authUserValidationProps),
});

export const passwordLoginResponseValidation = loginResponseValidation;
