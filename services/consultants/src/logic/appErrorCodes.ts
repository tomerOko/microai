/* error codes have to be unique in order to find the problem in a fast way with the debugger */
export const appErrorCodes = {
  //collect app error code from service
  
} as const;

export type AppErrorCode = (typeof appErrorCodes)[keyof typeof appErrorCodes];
