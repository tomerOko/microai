// controller.ts
import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import { NextFunction, Request, Response } from 'express';

/**
 * Test controller to verify that the Send Service is operational.
 */
export const test = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      res.send('Send Service is up and running');
    } catch (error) {
      errorHandler(error, next);
    }
  });
};
