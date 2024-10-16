// types/send.ts
import { z } from 'zod';
import { testRequestValidation, testResponseValidation } from './reqResValidations';

export type TestRequestType = z.infer<typeof testRequestValidation>;
export type TestResponseType = z.infer<typeof testResponseValidation>;
