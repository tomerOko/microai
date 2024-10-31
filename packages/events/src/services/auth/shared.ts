import z from 'zod';

export const authUserValidationProps = {
  ID: z.string(),
  email: z.string(),
  hasedPassword: z.string(),
};
