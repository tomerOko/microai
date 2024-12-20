// consultant.ts (shared validations)
import z from 'zod';
import { genders, Gender } from '../../shared/dictionaries/genders';
import { countries, Country } from '../../shared/dictionaries/countries';
import { languages, Language } from '../../shared/dictionaries/languages';

export const consultantValidationPropsMinimal = {
  age: z.number(),
  gender: z
    .string()
    .refine((value) => value in genders)
    .transform((value) => value as Gender),
  languages: z.array(
    z
      .string()
      .refine((value) => value in languages)
      .transform((value) => value as Language),
  ),
  country: z
    .string()
    .refine((value) => value in countries)
    .transform((value) => value as Country),
  profilePictureUrl: z.string().url(),
  aboutMe: z.string(),
};

export const consultantValidationProps = {
  ID: z.string(),
  userID: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  isActive: z.boolean(),
  ...consultantValidationPropsMinimal,
};

export const topicValidationPropsMinimal = {
  name: z.string(),
  description: z.string(),
  iconUrl: z.string().url(),
  minimalDurationMinutes: z.number(),
  hourlyRate: z.number(),
};

export const topicValidationProps = {
  ID: z.string(),
  consultantID: z.string(),
  userID: z.string(),
  isActive: z.boolean(),
  ...topicValidationPropsMinimal,
};
