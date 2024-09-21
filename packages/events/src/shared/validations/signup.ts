// signup.ts
import z from 'zod';

export const userValidationProps = {
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
  authMethods: z.array(z.string()), // e.g., ['email', 'google']
};

export const pincodeEntryValidationProps = {
  email: z.string().email(),
  pincode: z.string().length(6),
  createdAt: z.date(),
};
