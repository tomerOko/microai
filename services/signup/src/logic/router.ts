// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const signupEmail = pathMap['SIGNUP_EMAIL_PART1'];
router[signupEmail.method](
  signupEmail.path,
  validateRequest(signupEmail.requestValidation, signupEmail.responseValidation),
  controller.signupEmail,
);

const signupEmailPart2 = pathMap['SIGNUP_EMAIL_PART2'];
router[signupEmailPart2.method](
  signupEmailPart2.path,
  validateRequest(signupEmailPart2.requestValidation, signupEmailPart2.responseValidation),
  controller.signupEmailPart2,
);

const updateProfile = pathMap['UPDATE_PROFILE'];
router[updateProfile.method](
  updateProfile.path,
  Auth('LOGGED_IN'),
  validateRequest(updateProfile.requestValidation, updateProfile.responseValidation),
  controller.updateProfile,
);

const deactivateProfile = pathMap['DEACTIVATE_USER'];
router[deactivateProfile.method](
  deactivateProfile.path,
  Auth('LOGGED_IN'),
  validateRequest(deactivateProfile.requestValidation, deactivateProfile.responseValidation),
  controller.deactivateProfile,
);
