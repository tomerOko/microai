import { z } from 'zod';
import { OAuthProvider, oAuthProviders, OAuthProviderValidations } from './shared';

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

export const oAuthLoginRequestValidation = z.object({
  body: z
    .object({
      provider: z
        .string()
        .refine((value) => Object.keys(oAuthProviders).includes(value))
        .transform((value) => value as OAuthProvider),
      providerCredentials: z.any(),
    })
    .refine((value) => {
      const provider = value.provider;
      const providerCredentials = value.providerCredentials;
      const providerValidation = OAuthProviderValidations[provider];
      providerValidation.parse(providerCredentials);
    }),
});

export const oAuthLoginResponseValidation = loginResponseValidation;
