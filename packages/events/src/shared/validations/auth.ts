// auth.ts (shared validations)
import z from 'zod';

export const userValidationProps = {
  ID: z.string(),
  email: z.string().email(),
  passwordHash: z.string().optional(),
  oauthProviders: z
    .array(
      z.object({
        provider: z.string(),
        providerID: z.string(),
      }),
    )
    .optional(),
  authMethods: z.array(z.string()).optional(),
};
