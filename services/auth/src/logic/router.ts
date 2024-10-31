// router.ts
import { validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const loginPath = pathMap['PASSWORD_LOGIN'];
router.post(loginPath.path, validateRequest(loginPath.requestValidation, loginPath.responseValidation), controller.login);
