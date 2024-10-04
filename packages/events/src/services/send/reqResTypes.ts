// types/send.ts
import { z } from 'zod';
import { testRequestValidation, testResponseValidation } from '../validation/send';

export type TestRequestType = z.infer<typeof testRequestValidation>;
export type TestResponseType = z.infer<typeof testResponseValidation>;
