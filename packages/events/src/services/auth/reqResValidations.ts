import { z } from 'zod';
import { authUserValidationProps } from './shared';

export const passwordLoginRequestValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const passwordLoginResponseValidation = z.object({
  token: z.string(),
});
