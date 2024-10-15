// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const startCallPath = pathMap['START_CALL'];
router.post(
  startCallPath.path,
  Auth('LOGGED_IN'),
  validateRequest(startCallPath.requestValidation, startCallPath.responseValidation),
  controller.startCall,
);

const endCallPath = pathMap['END_CALL'];
router.post(
  endCallPath.path,
  Auth('LOGGED_IN'),
  validateRequest(endCallPath.requestValidation, endCallPath.responseValidation),
  controller.endCall,
);

const getCallDetailsPath = pathMap['GET_CALL_DETAILS'];
router.get(
  getCallDetailsPath.path,
  Auth('LOGGED_IN'),
  validateRequest(getCallDetailsPath.requestValidation, getCallDetailsPath.responseValidation),
  controller.getCallDetails,
);
