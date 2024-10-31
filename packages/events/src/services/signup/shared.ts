import z from 'zod';

export const userValidationPropsMinimal = {
  email: z.string().email(),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
};

export const userValidationProps = {
  ...userValidationPropsMinimal,
  ID: z.string(),
  hashedPassword: z.string(),
  isActive: z.boolean(),
};
