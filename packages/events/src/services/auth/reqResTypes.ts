import * as z from 'zod';
import { passwordLoginRequestValidation, passwordLoginResponseValidation } from './reqResValidations';

export type PasswordLoginRequestType = z.infer<typeof passwordLoginRequestValidation>;
export type PasswordLoginResponseType = z.infer<typeof passwordLoginResponseValidation>;
