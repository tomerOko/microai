import z from 'zod';

export const oAuthProviders = {
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK',
  GITHUB: 'GITHUB',
  APPLE: 'APPLE',
} as const;

export type OAuthProvider = keyof typeof oAuthProviders;

export const authMethods = {
  PASSWORD: 'PASSWORD',
  ...oAuthProviders,
} as const;

export type AuthMethod = keyof typeof authMethods;

export const OAuthProviderValidations = {
  [authMethods.PASSWORD]: z.object({
    passwordHash: z.string(),
  }),
  [authMethods.GOOGLE]: z
    .object({
      id: z.string(),
      accessToken: z.string(),
    })
    .optional(),
  [authMethods.FACEBOOK]: z
    .object({
      id: z.string(),
      accessToken: z.string(),
    })
    .optional(),
  [authMethods.GITHUB]: z
    .object({
      id: z.string(),
      accessToken: z.string(),
    })
    .optional(),
  [authMethods.APPLE]: z
    .object({
      id: z.string(),
      accessToken: z.string(),
    })
    .optional(),
} as const;

export const authUserValidationProps = {
  ID: z.string(),
  email: z.string().email(),
  oauthMethods: z.object(OAuthProviderValidations),
};
