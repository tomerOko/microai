// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const signupEmail = pathMap['SIGNUP_EMAIL'];
router.post(
  signupEmail.path,
  validateRequest(signupEmail.requestValidation, signupEmail.responseValidation),
  controller.signupEmail,
);

const completeClassicSignup = pathMap['COMPLETE_CLASSIC_SIGNUP'];
router.post(
  completeClassicSignup.path,
  validateRequest(completeClassicSignup.requestValidation, completeClassicSignup.responseValidation),
  controller.completeClassicSignup,
);

const signupOAuth = pathMap['SIGNUP_OAUTH'];
router.post(
  signupOAuth.path,
  validateRequest(signupOAuth.requestValidation, signupOAuth.responseValidation),
  controller.signupOAuth,
);

const addAuthMethod = pathMap['ADD_AUTH_METHOD'];
router.post(
  addAuthMethod.path,
  Auth('LOGGED_IN'),
  validateRequest(addAuthMethod.requestValidation, addAuthMethod.responseValidation),
  controller.addAuthMethod,
);

const updateProfile = pathMap['UPDATE_PROFILE'];
router.put(
  updateProfile.path,
  Auth('LOGGED_IN'),
  validateRequest(updateProfile.requestValidation, updateProfile.responseValidation),
  controller.updateProfile,
);

const deactivateProfile = pathMap['DEACTIVATE_PROFILE'];
router.post(
  deactivateProfile.path,
  Auth('LOGGED_IN'),
  validateRequest(deactivateProfile.requestValidation, deactivateProfile.responseValidation),
  controller.deactivateProfile,
);
