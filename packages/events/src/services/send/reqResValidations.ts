// validation/send.ts
import { z } from 'zod';

/**
 * Validation schema for the test request (no parameters required).
 */
export const testRequestValidation = z.object({});

/**
 * Validation schema for the test response.
 */
export const testResponseValidation = z.object({
  message: z.string(),
});
