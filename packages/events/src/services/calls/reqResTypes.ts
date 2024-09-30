// calls.ts (request and response types)
import * as z from 'zod';
import {
  startCallRequestValidation,
  startCallResponseValidation,
  endCallRequestValidation,
  endCallResponseValidation,
  getCallDetailsRequestValidation,
  getCallDetailsResponseValidation,
} from '../validation/calls';

export type startCallRequestType = z.infer<typeof startCallRequestValidation>;
export type startCallResponseType = z.infer<typeof startCallResponseValidation>;

export type endCallRequestType = z.infer<typeof endCallRequestValidation>;
export type endCallResponseType = z.infer<typeof endCallResponseValidation>;

export type getCallDetailsRequestType = z.infer<typeof getCallDetailsRequestValidation>;
export type getCallDetailsResponseType = z.infer<typeof getCallDetailsResponseValidation>;

export type scheduleCallPropsType = {
  bookingID: string;
  studentID: string;
  consultantID: string;
  availabilityBlockID: string;
};
