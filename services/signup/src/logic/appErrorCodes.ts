/* error codes have to be unique in order to find the problem in a fast way with the debugger */
export const appErrorCodes = {
  EMAIL_ALREADY_REGISTERED: 'EMAIL_ALREADY_REGISTERED',
  INVALID_PINCODE: 'INVALID_PINCODE',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_AUTH_METHOD_DATA: 'INVALID_AUTH_METHOD_DATA',
  AUTH_METHOD_ALREADY_EXISTS: 'AUTH_METHOD_ALREADY_EXISTS',
  INVALID_AUTH_METHOD_TYPE: 'INVALID_AUTH_METHOD_TYPE',
  CONFIG_VALIDATION_ERROR: 'CONFIG_VALIDATION_ERROR',
  UPDATE_USER_USER_NOT_FOUND: 'UPDATE_USER_USER_NOT_FOUND',
  VALIDATE_PINCODE_PINCODE_NOT_FOUND: 'VALIDATE_PINCODE_PINCODE_NOT_FOUND',
  VALIDATE_PINCODE_PINCODE_WRONG: 'VALIDATE_PINCODE_PINCODE_WRONG',
  VALIDATE_PINCODE_PINCODE_EXPIRED: 'VALIDATE_PINCODE_PINCODE_EXPIRED',
};

export type AppErrorCode = (typeof appErrorCodes)[keyof typeof appErrorCodes];
