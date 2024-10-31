// signup.ts (shared validations)
import z from 'zod';

export const userValidationPropsMinimal = {
  email: z.string().email(),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
};

export const passwordValidation = z.string().min(8);

export const authenticationMethodValidation = z.object({
  method: z.string(),
  email: z.string().email().optional(),
  password: passwordValidation.optional(),
});

export const userValidationProps = {
  ...userValidationPropsMinimal,
  ID: z.string(),
  hashedPassword: z.string(),
  isActive: z.boolean(),
};
